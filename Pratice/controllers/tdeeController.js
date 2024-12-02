const mysql = require('mysql');
const connectDB = require('../config/dbConn');
const path = require('path');

const data = {};
data.users = require('../model/tdee.json');


const createNewTDEE = (req, res) => {

    if (req.method === 'POST') {
        const { gender, age, weight, height, activity } = req.body;

        console.log("Received Data:", { gender, age, weight, height, activity });

        const tdee = Math.round(calculateTDEE(gender, age, weight, height, activity) * 100) / 100;

        res.status(202).json({ tdee });

    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}


function calculateTDEE(gender, age, weight, height, activity) {
    // Mifflin = (10 * m + 6.25 * h - 5 * a) + s
    // m = mass in kg, h = height in cm, a = age in years, s = 5 for male or -151 for females
    const mass = 0.453592 * weight;
    const mifflin = (10 * mass) + (6.25 * height) - (5 * age) + gender;

    return mifflin * activity;
}


module.exports = {
    createNewTDEE
}