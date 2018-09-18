
const {Rental, validateRental} = require('../models/rental');
const { Movie } = require('../models/movie');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


module.exports = router;