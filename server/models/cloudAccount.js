const Joi = require('joi');
const mongoose = require('mongoose');

const CloudAccount = mongoose.model('CloudAccount', new mongoose.Schema({
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
}));

// function validateCloudAccount(user) {
//     const schema = {
//         accessKey: Joi.string().min(5).max(255).required(),
//         secretKey: Joi.string().min(5).max(255).required(),
//         region: Joi.string().min(5).max(255).required()
//     };
//     return Joi.validate(user, schema);
// }

exports.CloudAccount = CloudAccount;
//exports.validate = validateCloudAccount;