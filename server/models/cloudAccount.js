const Joi = require('joi');
const mongoose = require('mongoose');
schema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
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
    },
    scanTime: {
        type: Number
    }
});

schema.statics.checkIfCloudAccountExist = function(accessKey) {
    return this.findOne({ accessKey: accessKey });
};

module.exports = mongoose.model('cloudAccount', schema);