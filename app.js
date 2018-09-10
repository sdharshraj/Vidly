const joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const geners = [
    {id:1, name: 'Action'},
    {id:2, name: 'Adventures'},
    {id:3, name: 'Drama'},
    {id:4, name: 'Scifi'}
];

app.get('/api/geners', (req, res) => {
    res.send(geners);
});

app.post('/api/geners', (req, res) => {
    const { error } = validateGenere(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const newGener = {
        id: geners.length + 1,
        name: req.body.name
    };
    geners.push(newGener);
    res.send(newGener);
});

app.put('/api/geners/:id', (req,res) => {
    const gener = geners.find( g => g.id === parseInt(req.params.id));
    if(!gener) return res.status(404).send('The gener with the given id is not available.');

    const { error } =  validateGenere(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    gener.name = req.body.name;

    res.send(gener);
})

app.delete('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) return res.status(404).send('The gener with the given id is not available.');

    const index = geners.indexOf(gener);
    const delGener = geners.splice(index,1);
    res.send(delGener);
})

app.get('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) return res.status(404).send('The gener with the given id is not available.');

    res.send(gener);
})

function validateGenere(gener){
    const schema = {
        name: joi.string().min(3).required()
    };
    return joi.validate(gener, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on ' + port));