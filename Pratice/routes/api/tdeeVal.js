const express = require('express');
const router = express.Router();
const connectDB = require('../../config/dbConn');
const tdeeController = require('../../controllers/tdeeController');

router.route('/')
    .post(tdeeController.createNewTDEE)



module.exports = router;
