const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Express app sample",
        message: " Hello, Harsh Raj"
    });
});

module.exports = router;