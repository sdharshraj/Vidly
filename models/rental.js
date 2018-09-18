const mongoose = require('mongoose');
const joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customers: {
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true,
                minlength:5,
                maxlength:255
            },
            isGold : {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength:7,
                maxlength:15
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength: 4,
                maxlength: 255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        default: Date.now,
        required: true
    },
    dateReturned:{
        type: Date
    },
    totalFee:{
        type: Number,
        min: 0
    }
}));

function validateRental(Rental) {
    const Schema = {
        customerId: joi.String().required(),
        movieId: joi.String().required()
    };

    return joi.validate(Rental, Schema);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;