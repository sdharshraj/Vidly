const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validategenree(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newgenre = new Genre({
        name: req.body.name
    });
    newGenre = await newgenre.save();
    res.send(newgenre);
});

router.put('/:id', async (req, res) => {
    try {
        const {
            error
        } = validategenree(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let genre = await Genre.findOneAndUpdate({
            '_id': req.params.id
        }, {
            name: req.body.name
        }, {
            new: true
        });
        if (!genre) return res.status(404).send('The genre with the given id is not available.');
        res.send(genre);
    } catch (err) {
        console.log(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let genre = await Genre.findOneAndRemove({
            '_id': req.params.id
        });

        if (!genre) return res.status(404).send('The genre with the given id is not available.');

        res.send(genre);
    } catch (err) {
        res.send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findOne({
        '_id': req.params.id
    });
    if (!genre) return res.status(404).send('The genre with the given id is not available.');

    res.send(genre);
})

function validategenree(genre) {
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(genre, schema);
}

module.exports = router;