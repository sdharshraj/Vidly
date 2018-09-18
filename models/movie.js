const mongoose = require('mongoose');
const joi = require('joi');
const genreSchema = require('./genre');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        minl: 0,
        max: 255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});
const Movie = mongoose.model('Movies', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: joi.string().min(3).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    };
    return joi.validate(movie, schema);
}

module.exports.Movie = Movie;
exports.validateMovie = validateMovie;