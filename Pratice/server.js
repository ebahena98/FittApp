const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const http = require('http');
const mysql = require('mysql');
const app = express();
const server = http.createServer();
const port = 8080;

// CUSTOM MIDDLEWARE LOGGER 
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['http://localhost:5500', 'http://localhost:8080']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


//DEFAULT ROUTE (INDEX.HTML)
app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname });
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
})

// HOME ROUTE
app.get('/home(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'home.html'));
})

// REGISTER ROUTE
app.get('/register(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'register.html'));
})


// LOGIN ROUTE
app.get('/login(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'login.html'));
})

// TDEE ROUTE
app.get('/tdee(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'tdee.html'));
})

// CONTACT ROUTE
app.get('/contact(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'contact.html'));
})

// ABOUT ROUTE
app.get('/about(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'about.html'));
})



// REDIRECT OLD PAGE IF MOVED
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/home.html');
})


// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
});


// ANYTHING ENTERED IN URL 404 PAGE
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
})

app.use(errorHandler);

// APP LISTENING ON PORT: 3000 
app.listen(port, (req, res) => {
    console.log("Server listening on port: " + port);
});