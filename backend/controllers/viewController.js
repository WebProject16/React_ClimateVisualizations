const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const createView = (req, res) => {

    const { views } = req.body;

    const url = uuidv4();
    const userID = req.id;

    res.status(201).json({url:url, userID: userID})
}

const deleteView = (req, res) => {

    const { url } = req.params;

    const userID = req.id;

    const data = {
        url: url,
        userID: userID
    }

    console.log(data);

    viewModel.delete(data, (err, result) => {

        if(err) {
            console.log(err);
            return res.json({status:"error", msg:"Error on deleting view"})
        }

        if(result.affectedRows === 1){

            res.json({status:"success", msg:"View deleted"})
        }else{
            res.json({status:"success", msg:"View was not deleted"})
        }
    })
}

module.exports = {
    createView,
    deleteView
}