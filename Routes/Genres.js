const express = require('express');
const mongoose = require('mongoose');
const {Genre, validategenre} = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validategenre(req.body);
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
        } = validategenre(req.body);
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
        res.send(err.message);
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
module.exports = router; 