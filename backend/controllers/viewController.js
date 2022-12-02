const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const create = (req, res) => {

    const url = uuidv4();
    const userID = req.id;

    res.status(201).json({url:url, userID: userID})
}

module.exports = {
    create
}