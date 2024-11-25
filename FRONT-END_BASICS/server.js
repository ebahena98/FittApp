// cmd: npx nodemon src/server.js
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = 8080;
//USE FUNCTIONS
app.use(express.json());
app.use(express.static('public'));
// DATABASE CONNECTION
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Applerope123!',
    database: 'fitness_app',
});



// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.status(200).send('login.html')
})

// GET ROUTE
app.get('/info/:dynamic', (req, res) => {
    const { dynamic } = req.params;
    const { key } = req.query;
    console.log(dynamic, key);
    res.status(200).json({ info: 'preset text' })
})


// POST SIGN UP ROUTE (Sending to server-from-client)
app.post('/signup', (req, res) => {
    const {
        user_firstName,
        user_lastName,
        user_email,
        user_password,
    } = req.body;


    if (!user_firstName || !user_lastName || !user_email || !user_password) {
        return res.status(400).json({ error: 'First name, last name, email, password required' });
    }


    const checkQuery = 'SELECT * FROM fitness_app.users WHERE user_email = ?';
    connection.query(checkQuery, [user_email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const query = `
        INSERT INTO users (user_firstName, user_lastName, user_email, user_password)
        VALUES (?, ?, ?, ?)`;

        connection.query(query, [user_firstName, user_lastName, user_email, user_password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            const newUser = {
                id: results.insertId,
                user_firstName,
                user_lastName,
                user_email,
                user_password,
            };

            res.status(201).json(newUser);
        });
    })
});




// CHANGED THIS ONE
app.get('/db/user', (req, res) => {
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database query error');
        }

        console.log(results);
        res.json(results); // Send results directly
    });
});



app.get('/api/users', (req, res) => {
    const users = [{
        id: '123',
        name: 'Shaun',
    }, {
        id: '234',
        name: 'Bob',
    }, {
        id: '345',
        name: 'Sue',
    }];

    res.json(users);
})




app.listen(port, () => {
    console.log('Server is listening on port 8080');
});