const mysql = require('mysql');

const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Applerope123!',
    database: 'fitness_app',
});

module.exports = connectDB