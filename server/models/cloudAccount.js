const Joi = require('joi');
const mongoose = require('mongoose');
const schemaCloudAccount = {
    displayName: Joi.string().min(2).max(50).required(),
    cloudProvider: Joi.string().min(2).max(50).required(),
    accessKey: Joi.string().min(5).max(255).required(),
    secretKey: Joi.string().min(5).max(255).required()
};

class CloudAccount {
    constructor() {
        this.schema = new mongoose.Schema({
            displayName: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            cloudProvider: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },
            accessKey: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                unique: true
            },
            secretKey: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                unique: true
            }
        });
        this.cloudModel = mongoose.model('CloudAccount', this.schema);
    }

    validateCloudAccount(payload) {
        return Joi.validate(payload, schemaCloudAccount);
    }

    async checkIfCloudAccountExist(accessKey) {
        return this.cloudModel.findOne({ accessKey: accessKey });
    }

    async insertCloudAccount(displayName, cloudProvider, accessKey, secretKey) {
        const insertDocument = {
            displayName: displayName,
            cloudProvider: cloudProvider,
            accessKey: accessKey,
            secretKey: secretKey };
        return await this.cloudModel.create(insertDocument)
    }
}

const cloudAccount = new CloudAccount();
module.exports = cloudAccount;