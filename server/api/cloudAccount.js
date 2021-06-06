const CloudAccounts = require('../controllers/cloudAccount');
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middlewares/schemaValidator');
const catchAsync = require('../utils/catchAsync');
const {schemaCloudAccount} = require('../schemas');

router.route('/')
    .post(validateRequest(schemaCloudAccount), catchAsync(CloudAccounts.addCloudAccount))
    .get(catchAsync(CloudAccounts.getCloudAccounts))
router.route('/:id')
    .get(catchAsync(CloudAccounts.getCloudAccountById))
    .delete(catchAsync(CloudAccounts.deleteCloudAccount))
router.route('/:id/schedule-scan')
    .patch(catchAsync(CloudAccounts.setScanSchedule))

module.exports = router;