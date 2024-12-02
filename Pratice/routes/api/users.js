const express = require('express');
const router = express.Router();
const connectDB = require('../../config/dbConn');
const usersController = require('../../controllers/usersController');

connectDB;

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);


router.route('/:id')
    .get(usersController.getUser);


module.exports = router;