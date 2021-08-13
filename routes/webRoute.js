//importing libraries
const express = require('express');
const path = require('path'); 

const router = express.Router();

//add a route to get the html 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
})


router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})


module.exports = router