const Joi = require('joi');

const schemaCloudAccount = Joi.object({
    displayName: Joi.string().min(2).max(50).required(),
    cloudProvider: Joi.string().min(2).max(50).required(),
    accessKey: Joi.string().min(5).max(255).required(),
    secretKey: Joi.string().min(5).max(255).required()
});

const schemaUserRegister = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

const schemaUserLogin = Joi.object({
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});


// export the schemas
module.exports = {
    schemaCloudAccount,
    schemaUserRegister,
    schemaUserLogin
};
