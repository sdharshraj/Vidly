const joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: true,
        minl: 5,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 1024
    }
});

const User = mongoose.model('User', userSchema);

function ValidateUser(user) {
    const schema = {
        name: joi.string().min(4).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    };
    return joi.validate(user, schema);
}

module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.ValidateUser = ValidateUser;