const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
schema.plugin(passportLocalMongoose,{usernameField: 'email'});

module.exports = mongoose.model('User', schema);
