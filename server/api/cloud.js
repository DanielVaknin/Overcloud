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


//
// router.get("/:cloudId/recommendations", async (req, res) => {
//     console.log(req.params)
//     const cloudId = req.params.cloudId;
//     console.log(cloudId)
//     request.get(
//         `http://127.0.0.1:5000/recommendations?cloud_account=${cloudId}`,
//         function (error, response) {
//             if (!error && response.statusCode === 200) {
//                 console.log('SUCCEED!');
//                 res.send(response.body)
//             }
//             if (error && response.statusCode === 404) {
//                 console.log('ERROR!');
//                 res.send(error);
//             }
//
//         }
//     );
// });
//
// router.get("/:cloudId/recommendations/:recommendId", async (req, res) => {
//     const cloudId = req.params.cloudId;
//     const recommendId = req.params.recommendId;
//     request.get(
//         `http://127.0.0.1:5000/recommendations?cloud_account=${cloudId}&recommendation=${recommendId}`,
//         function (error, response) {
//             if (!error && response.statusCode === 200) {
//                 console.log('SUCCEED!');
//             }
//             res.send(response.body)
//         }
//     );
// });
module.exports = router;