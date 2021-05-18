const CloudAccounts = require('../models/cloudAccount');

module.exports.addCloudAccount = async (req, res, next) => {
    const { displayName, cloudProvider, accessKey, secretKey, scanInterval } = req.body;
    let cloudAccount = await CloudAccounts.checkIfCloudAccountExist(accessKey);

    if (cloudAccount) {
        return res.status(400).json({
            "status": "error",
            "error": "Cloud account with access key " + accessKey + " already exists"
        });
    } else {
        const cloudAccount = new CloudAccounts({displayName, cloudProvider, accessKey, secretKey, scanInterval})
        await cloudAccount.save()
        res.json(cloudAccount)
    }
}

module.exports.setScanSchedule = async (req, res, next) => {
    const { id } = req.params;
    const { scan_interval } = req.body;
    CloudAccounts.findByIdAndUpdate(id, { scanInterval: parseInt(scan_interval)}, {new: true}, function(err, model) {
        if (err || model === null) return res.status(404).json({
            "status": "error",
            "error": "Could not find cloud account with ID: " + id
        });
        res.json(model);
    });
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