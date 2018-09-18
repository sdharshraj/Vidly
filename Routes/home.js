const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Express app sample",
        message: " Hello, Harsh Raj",
        sampleText: "This is just a sample text which may have body for the website."
    });
});

module.exports = router;