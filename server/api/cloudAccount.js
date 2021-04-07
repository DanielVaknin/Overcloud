const CloudAccounts = require('../controllers/cloudAccount');
const express = require('express');
const router = express.Router();
const request = require('request');
const { validateRequest } = require('../middlewares/SchemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaCloudAccount} = require('../schemas');

router.route('/')
    .post(validateRequest(schemaCloudAccount), catchAsync(CloudAccounts.addCloudAccount))
    .get(catchAsync(CloudAccounts.getCloudAccounts))
router.route('/:id')
    .get(catchAsync(CloudAccounts.getCloudAccountById))
    .delete(catchAsync(CloudAccounts.deleteCloudAccount))

module.exports = router;