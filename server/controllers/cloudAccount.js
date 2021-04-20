const CloudAccounts = require('../models/cludAccount');
const cron = require('node-cron');
const axios = require('axios')

module.exports.addCloudAccount = async (req, res, next) => {
    const { displayName, cloudProvider, accessKey, secretKey, scanTime } = req.body;
    let cloudAccount = await CloudAccounts.checkIfCloudAccountExist(accessKey);

    if (cloudAccount) {
        return res.status(400).json({
            "status": "error",
            "error": "Cloud account with access key " + accessKey + " already exists"
        });
    } else {
        const cloudAccount = new CloudAccounts({displayName, cloudProvider, accessKey, secretKey})
        await cloudAccount.save()

        if(scanTime != undefined )
        {
            //creating a cron schedule task for scanning recommendations for the cloudAccount
            console.log("Inisde the IF");
            cron.schedule(`*/${scanTime} * * * *`, function() {
                console.log(`Running a scan every ${scanTime} minute`);
                axios.post('http://localhost:5000/recommendations/scan', {
                    cloud_account: cloudAccount._id},
                    {
                        headers: { 'content-type': 'application/json' }});
            });
        }
        res.json(cloudAccount)
    }
}

module.exports.getCloudAccounts = async (req, res, next) => {
    CloudAccounts.find(function(err, docs) {
        if (err) return res.status(404).json({
            "status": "error",
            "error": "Could not get cloud accounts"
        })
        res.json(docs);
    });
}
module.exports.getCloudAccountById = async (req, res, next) => {
    const { id } = req.params;
    CloudAccounts.findById(id, function(err, doc) {
        if (err) return res.status(404).json({
            "status": "error",
            "error": "Could not find cloud account with ID: " + id
        })
        res.json(doc);
    });
}
module.exports.deleteCloudAccount = async (req, res, next) => {
    const { id } = req.params;
    CloudAccounts.findByIdAndDelete(id, function(err, doc) {
        console.log(doc)
        if (err || doc === null) return res.status(404).json({
            "status": "error",
            "error": "Failed to delete cloud account with ID: " + id
        })
        return res.json({
            "status": "ok",
            "error": "Deleted cloud account with ID: " + id
        });
    });
}