
const CloudAccounts = require('../models/cloudAccount');

module.exports.addCloudAccount = async (req, res, next) => {
    const { displayName, cloudProvider, accessKey, secretKey } = req.body;
    let addAccount = await CloudAccounts.checkIfCloudAccountExist(accessKey);
    if (addAccount) {
        return res.status(400).send('That cloud account already exists!');
    } else {
        // Insert the new user if they do not exist yet

        const addAccount = new CloudAccounts({displayName, cloudProvider, accessKey, secretKey})
        await addAccount.save()
        res.send(addAccount)
    }
}

module.exports.getCloudAccounts = async (req, res, next) => {
    const accounts = await CloudAccounts.find();
    res.send(accounts)
}
module.exports.getCloudAccountById = async (req, res, next) => {
    const { id } = req.params;
    const account = await CloudAccounts.findById(id);
    if (!account) {
        return res.status(404).send('That cloud account Not found');
    }
    res.send(account)
}
module.exports.deleteCloudAccount = async (req, res, next) => {
    const { id } = req.params;
    const accounts = await CloudAccounts.findByIdAndDelete(id);
    res.send({status: "ok"})
}