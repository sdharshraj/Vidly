const joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    isGold:{
        type: Boolean,
        default: false,
        required: true
    },
    phone: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
});

const Customer = mongoose.model('Customer', customerSchema);

function ValidateCustomer(customer) {
    const schema = {
        name: joi.string().min(3).max(50).required(),
        phone: joi.string().min(3).max(50).required(),
        isGold: joi.boolean()
    };
    return joi.validate(customer, schema);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.ValidateCustomer = ValidateCustomer;