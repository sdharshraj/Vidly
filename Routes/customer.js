const express = require('express');
const mongoose = require('mongoose');
const {User,ValidateUser} = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await User.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {
        error
    } = ValidateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newCustomer = new User({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    newCustomer = await newCustomer.save();
    res.send(newCustomer);
});

router.put('/:id', async (req, res) => {
    try {
        const {
            error
        } = ValidateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = await User.findOneAndUpdate({
            '_id': req.params.id
        }, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, {
            new: true
        });
        if (!customer) return res.status(404).send('The customer with the given id is not available.');
        res.send(customer);
    } catch (err) {
        res.send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let customer = await User.findOneAndRemove({
            '_id': req.params.id
        });

        if (!customer) return res.status(404).send('The customer with the given id is not available.');

        res.send(customer);
    } catch (err) {
        res.send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    const customer = await User.findOne({
        '_id': req.params.id
    });
    if (!customer) return res.status(404).send('The customer with the given id is not available.');

    res.send(customer);
})
module.exports = router;