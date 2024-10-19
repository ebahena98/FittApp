// cmd: npx nodemon src/server.js

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
app.use(express.json());


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Applerope123!',
    database: 'fitness_app',
});

// POST endpoint to add a user
app.post('/db/user', (req, res) => {
    const {
        user_firstName,
        user_lastName,
        user_email,
        user_age,
        user_weight,
        user_height,
        user_goalWeight,
        user_activityLevel
    } = req.body;

    if (!user_firstName || !user_lastName || !user_email || !user_age || !user_weight || !user_height || !user_goalWeight || !user_activityLevel) {
        return res.status(400).json({ error: 'First name, last name, email, age, weight, height, goal weight, and activity level are required' });
    }

    const checkQuery = 'SELECT * FROM users WHERE user_email = ?';
    connection.query(checkQuery, [user_email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const query = `
        INSERT INTO users (user_firstName, user_lastName, user_email, user_age, user_weight, user_height, user_goalWeight, user_activityLevel)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        connection.query(query, [user_firstName, user_lastName, user_email, user_age, user_weight, user_height, user_goalWeight, user_activityLevel], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            const newUser = {
                id: results.insertId,
                user_firstName,
                user_lastName,
                user_email,
                user_age,
                user_weight,
                user_height,
                user_goalWeight,
                user_activityLevel
            };

            res.status(201).json(newUser);
        });
    })
});



// app.get('/db/user', (req, res) => {
//     connection.query("SELECT * FROM users", (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Database query error');
//         }

//         console.log(results);
//         res.json(results); // Send results directly
//     });
// });



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


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});