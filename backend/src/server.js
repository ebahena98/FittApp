// npx nodemon src/server.js

const express = require('express');
const path = require('path');

const app = express();

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

// SENDING FILE TO FRONTEND
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
    // res.status(200).send('index.html');
});