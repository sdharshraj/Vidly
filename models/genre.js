
const joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validategenre(genre) {
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validategenre = validategenre;