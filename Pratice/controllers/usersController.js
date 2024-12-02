const data = {};
data.users = require('../model/users.json');

const getAllUsers = (req, res) => {
    res.json(data.users);
}

const createNewUser = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const updateUser = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deleteUser = (req, res) => {
    res.json({ "id": req.body.id })
}

const getUser = (req, res) => {
    res.json({ "id": req.params.id });
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}