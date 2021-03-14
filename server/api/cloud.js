const cloudAccount = require('../models/cloudAccount');
const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/addAccount', async (req, res) => {

    // First Validate The Request
    const { error } = cloudAccount.validateCloudAccount(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exists
    let addAccount = await cloudAccount.checkIfCloudAccountExist(req.body.accessKey);
    if (addAccount) {
        return res.status(400).send('That cloud account already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        addAccount = await cloudAccount.insertCloudAccount(
            req.body.displayName,
            req.body.cloudProvider,
            req.body.accessKey,
            req.body.secretKey)
        console.log(addAccount._id);

        //Send the cloudAccount to python service to create recommnedations

        request.post(
            'http://127.0.0.1:5000/recommends/scan',
            { json: { identity: addAccount._id } },
            function (error, response, body) {
                console.log(response.body);
                if (!error && response.statusCode === 200) {
                    console.log('SUCCEED!');
                }
                res.send(response.body)
            }
        );
    }
});

router.get('/accounts', async (req, res) => {
    const result = await cloudAccount.getCloudAccounts();
    res.send(result)
});

router.get("/:cloudId/recommendations", async (req, res) => {
    const cloudId = req.params.cloudId;
    request.get(
        `http://127.0.0.1:5000/recommendations?cloud_account=${cloudId}`,
        function (error, response) {
            if (!error && response.statusCode === 200) {
                console.log('SUCCEED!');
            }
            res.send(response.body)
        }
    );
});

router.get("/:cloudId/recommendations/:recommendId", async (req, res) => {
    const cloudId = req.params.cloudId;
    const recommendId = req.params.recommendId;
    request.get(
        `http://127.0.0.1:5000/recommendations?cloud_account=${cloudId}&recommendation=${recommendId}`,
        function (error, response) {
            if (!error && response.statusCode === 200) {
                console.log('SUCCEED!');
            }
            res.send(response.body)
        }
    );
});
module.exports = router;