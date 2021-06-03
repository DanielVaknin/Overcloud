const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const {schemaUserRegister, schemaUserLogin} = require('../schemas');
const { validateRequest } = require('../middlewares/schemaValidator');

router.post('/register', validateRequest(schemaUserRegister),catchAsync(user.register))
router.post('/login', validateRequest(schemaUserLogin), passport.authenticate('local'),(req,res) => {
    res.json(req["user"])
})
router.post("/logout", (req, res) => {
    req.logout();
    res.send({status: "ok"})
});
module.exports = router;