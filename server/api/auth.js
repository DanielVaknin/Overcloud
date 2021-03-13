const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const user = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {

    // First Validate The HTTP Request
    const { error } = user.validateUserLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //  Now find the user by their email address
    let userLogin = await user.checkIfUserExist(req.body.email);
    if (!userLogin) {
        return res.status(400).send('Incorrect email or password.');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, userLogin.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = jwt.sign({ _id: userLogin._id }, 'PrivateKey');
    res.header('x-auth-token', token).send(_.pick(userLogin, ['_id', 'name', 'email']));
});

module.exports = router;