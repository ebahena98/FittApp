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
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/users', require('./routes/api/users'));


// ANYTHING ENTERED IN URL 404 PAGE
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
})

app.use(errorHandler);

// APP LISTENING ON PORT: 3000 
app.listen(port, (req, res) => {
    console.log("Server listening on port: " + port);
});