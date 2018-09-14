const express = require('express');
const genres = require('./Routes/Genres');
const home = require('./Routes/home');
const app = express();
const mongoose = require('mongoose');

const uri = 'mongodb://sdharshraj:Password123@ds253922.mlab.com:53922/nodedemo';
mongoose.connect(uri, {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch('some error occured while connecting to mongo.');

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views'); // default so optional
app.use('/api/genres', genres);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on ' + port));