const mysql = require('mysql');
const connectDB = require('../config/dbConn');
const path = require('path');

const data = {};
data.users = require('../model/users.json');
connectDB;

const createNewUser = (req, res) => {

    const {
        firstname, lastname, email, password
    } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: 'First name, last name, email, password required' });
    }

    console.log(firstname, lastname, email, password);


    const checkQuery = 'SELECT * FROM fitness_app.users WHERE user_email = ?';
    connectDB.query(checkQuery, [email], (err, results) => {
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

        connectDB.query(query, [firstname, lastname, email, password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            const newUser = {
                id: results.insertId,
                firstname,
                lastname,
                email,
                password,
            };

            res.status(201).json(newUser);
        });
    })
}

module.exports = { createNewUser };

// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }

// const fsPromises = require('fs').promises;
// const path = require('path');
// const bcrypt = require('bcrypt');

// const handleNewUser = async (req, res) => {
//     const { user, pwd } = req.body;
//     if (!user || !pwd)
//         return res.status(400).json({ 'message': 'Username and password are required.' });

//     const duplicate = usersDB.users.find(person => person.username === user);
//     if (duplicate) return res.sendStatus(409); // Conflict
//     try {
//         // encrypt pwd
//         const hashedPwd = await bcrypt.hash(pwd, 10);
//         // store the new user
//         const newUser = { "username": user, "password": hashedPwd };
//         usersDB.setUsers([...usersDB.users, newUser]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );

//         console.log(usersDB.users);
//         res.status(201).json({ 'success': `New user ${user} created!` });

//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }

// }

// module.exports = { handleNewUser };
