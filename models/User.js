const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema)