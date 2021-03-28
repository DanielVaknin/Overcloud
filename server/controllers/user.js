const User = require('../models/user');

module.exports.register = async (req, res, next) => {
    const { email, name, password } = req.body;
    const user = new User({ email, name });
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
}

