const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const {
        error
    } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or Password.');

    const validPass = await bcrypt.compare( req.body.password , user.password);
    if (!validPass) return res.status(400).send('Invalid email or Password.');

    //config is not working s hardcoded
    const token = await jwt.sign({'_id' : user._id}, "jwtPrivateKey");
    res.send(token);
});

function Validate(req) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    };
    return joi.validate(req, schema);
}
module.exports = router;