const user = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    // First Validate The Request
    const { error } = user.validateUserRegister(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exists
    let userRegister = await user.checkIfUserExist(req.body.email);
    console.log(userRegister)
    if (userRegister) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        userRegister = await user.insertUser(req.body.name, req.body.email, req.body.password)
        res.send(userRegister);
    }
});



module.exports = router;