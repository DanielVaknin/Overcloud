const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemaRegister = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
};

const schemaLogin = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
};



class User {
    constructor() {
        this.schema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                unique: true
            },
            password: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 1024
            }
        });
        this.userModel = mongoose.model('User', this.schema);
    }

    validateUserRegister(payload) {
        return Joi.validate(payload, schemaRegister);
    }

    validateUserLogin(payload) {
        return Joi.validate(payload, schemaLogin);
    }

    async checkIfUserExist(userEmail) {
        return this.userModel.findOne({email: userEmail});
    }

    async insertUser(name, email, password) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const insertDocument = {name: name, email: email, password: password};
        await this.userModel.create(insertDocument)
        return insertDocument;
    }
}
module.exports = new User();