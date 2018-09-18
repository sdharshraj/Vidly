const express = require('express');
const mongoose = require('mongoose');
const {Customer,ValidateCustomer} = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {
        error
    } = ValidateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newCustomer = new Customer({
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
        } = ValidateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = await Customer.findOneAndUpdate({
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
        let customer = await Customer.findOneAndRemove({
            '_id': req.params.id
        });

        if (!customer) return res.status(404).send('The customer with the given id is not available.');

        res.send(customer);
    } catch (err) {
        res.send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findOne({
        '_id': req.params.id
    });
    if (!customer) return res.status(404).send('The customer with the given id is not available.');

    res.send(customer);
})
module.exports = router;