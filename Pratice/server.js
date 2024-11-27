const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MALWARE
app.use(express.json());
app.use(express.static('public'));

// APP LISTENING ON PORT: 3000 
app.listen(port, (req, res) => {
    console.log("Server listening on port: " + port);
});


//DEFAULT ROUTE (INDEX.HTML)
app.get('/', (req, res) => {
    res.status(200).send("index.html");
})

// HOME ROUTE
app.get('/home', (req, res) => {
    res.status(200).send('home.html');
})

// ACCOUNT ROUTE
app.get('/account', (req, res) => {
    res.status(200).send('account.html');
})

// CONTACT ROUTE
app.get('/contact', (req, res) => {
    res.status(200).send('contact.html');
})

// ABOUT ROUTE
app.get('/about', (req, res) => {
    res.status(200).send('/about.html');
})






