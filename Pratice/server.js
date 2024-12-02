// https://www.youtube.com/watch?v=f2EqECiTBL8 @ 3:23:00

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const http = require('http');
const mysql = require('mysql');
const app = express();
const server = http.createServer();
const port = 8080;

// CUSTOM MIDDLEWARE LOGGER 
app.use(logger);

// CROSS ORIGIN RESOURCE SHARING
app.use(cors(corsOptions));

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));


// routes
app.use('/', require('./routes/root'));
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