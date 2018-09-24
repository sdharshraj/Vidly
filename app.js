const express = require('express');
const genres = require('./Routes/genres');
const movies = require('./Routes/movies');
const config = require('config');
const customers = require('./Routes/customer');
const home = require('./Routes/home');
const rentals = require('./Routes/rental');
const users = require('./Routes/users');
const auth = require('./Routes/auth');
const app = express();
const mongoose = require('mongoose');

//config is not working
// if(!config.get("jwtPrivateKey")){
//     console.error("FATAL ERROR - JWT token is not set.");
//     process.exit(1);
// }

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
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/customers', customers);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on ' + port));