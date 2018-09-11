const joi = require('joi');
const express = require('express');
const genres = require('./Routes/Genres');
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views'); // default so option
app.use('/api/genres', genres);

app.get('/',(req, res) => {
    res.render('index',{title: "Express app sample", message:" Hello, Harsh Raj"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on ' + port));