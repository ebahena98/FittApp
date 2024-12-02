const express = require('express');
const router = express.Router();
const connectDB = require('../config/dbConn');
const registerController = require('../controllers/registerController');
connectDB;

router.post('/', registerController.createNewUser);


module.exports = router;