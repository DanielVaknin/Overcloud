const bcrypt = require('bcrypt');
const { CloudAccount } = require('../models/cloudAccount');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var request = require('request');

router.post('/addCloudAccount', async (req, res) => {
    // First Validate The Request
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    // Check if this user already exisits
    let cloudAccount = await CloudAccount.findOne({ accessKey: req.body.accessKey });
    if (cloudAccount) {
        return res.status(400).send('That cloud account already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        cloudAccount = new CloudAccount({
            displayName: req.body.displayName,
            cloudProvider: req.body.cloudProvider,
            accessKey: req.body.accessKey,
            secretKey: req.body.secretKey
        });

        //const salt = await bcrypt.genSalt(10);
        //cloudAccount.password = await bcrypt.hash(cloudAccount.secretKey, salt);

        await cloudAccount.save();
        console.log(cloudAccount._id);
        res.send(cloudAccount);

        //Send the cloudAccount to python service to create recommnedations

        request.post(
            'http://127.0.0.1:5000/recommends/scan',
            { json: { identity: cloudAccount._id } },
            function (error, response, body) {
                console.log(response.body);
                if (!error && response.statusCode == 200) {
                    console.log('SUCCEED!');
                    console.log(body);
                }
            }
        );

    }
});

module.exports = router;