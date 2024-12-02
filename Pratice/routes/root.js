const express = require('express');
const router = express.Router();
const path = require('path');

//DEFAULT ROUTE (INDEX.HTML)
router.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

// HOME ROUTE
router.get('/home(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'home.html'));
})

// REGISTER ROUTE
router.get('/register(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'register.html'));
})

// LOGIN ROUTE
router.get('/login(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})

// TDEE ROUTE
router.get('/tdee(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'tdee.html'));
})

// CONTACT ROUTE
router.get('/contact(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'contact.html'));
})

// ABOUT ROUTE
router.get('/about(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'about.html'));
})


module.exports = router;