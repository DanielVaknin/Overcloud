const Cloud = require('../controllers/cloud');
const express = require('express');
const router = express.Router();
const request = require('request');
const { validateRequest } = require('../middlewares/SchemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaCloudAccount} = require('../schemas');

router.route('/')
    .post(validateRequest(schemaCloudAccount), catchAsync(Cloud.addCloudAccount))
    .get(catchAsync(Cloud.getCloudAccounts))
router.route('/:id')
    .get(catchAsync(Cloud.getCloudAccountById))
    .delete(catchAsync(Cloud.deleteCloudAccount))

module.exports = router;