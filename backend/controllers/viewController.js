const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const createView = (req, res) => {

    const { views, isParallel } = req.body;

    if(!views || !isParallel){
        return res.status(404).json({status:"error", msg:"One or more values are missing"})
    }

    const url = uuidv4();
    const userID = req.id;

    if(!userID){
        return res.status(404).json({status:"error", msg:"Invalid user token"})
    }

    const data = {
        url: url,
        userID: userID,
        views: views,
        isParallel: isParallel
    }

    viewModel.create(data, (err, result) => {
        if(err) {
            console.log(err);
            return res.json({status:"error", msg:"Error on view creation"})
        }

        res.status(201).json({status:"success", msg:"Created new visualization", url:url})
    })
}

const deleteView = (req, res) => {

    const { url } = req.params;

    if(!url){
        return res.status(404).json({status:"error", msg:"One or more values are missing"})
    }


    const userID = req.id;

    if(!userID){
        return res.status(404).json({status:"error", msg:"Invalid user token"})
    }

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