const express = require('express');
const joi = require('joi');
const router = express.Router();

const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Adventures'},
    {id:3, name: 'Drama'},
    {id:4, name: 'Scifi'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const { error } = validategenree(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const newgenre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(newgenre);
    res.send(newgenre);
});

router.put('/:id', (req,res) => {
    const genre = genres.find( g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id is not available.');

    const { error } =  validategenree(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id is not available.');

    const index = genres.indexOf(genre);
    const delgenre = genres.splice(index,1);
    res.send(delgenre);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id is not available.');

    res.send(genre);
})

function validategenree(genre){
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(genre, schema);
}

module.exports = router;