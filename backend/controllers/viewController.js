const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const createView = (req, res) => {

    const { views, isParallel, description } = req.body;

    if(typeof views !== "string" || typeof isParallel !== "number" || typeof description !== "string"){
        return res.status(400).json({status:"error", msg:"Wrong type of input or values missing"});
    }

    if(views.length > 30){
        return res.status(400).json({status:"error", msg:"Views are too long"});
    }

    if(description.length > 1024){
        return res.status(400).json({status:"error", msg:"Description is too long"});
    }

    const url = uuidv4();
    const userID = req.id;

    if(!userID){
        return res.status(400).json({status:"error", msg:"Invalid user token"});
    }

    const visualizations = views.split(",");

    const validRoutes = ["v1","v3","v4","v5","v6","v7","v8","v9"];

    const validVisualizations = visualizations.filter(vis => {
        return validRoutes.indexOf(vis) !== -1;
    })

    if(validVisualizations.toString() !== views){
        return res.status(400).json({status:"error", msg:"Invalid input for 'views'"});
    }

    const data = {
        url: url,
        userID: userID,
        views: views,
        isParallel: isParallel,
        description: description
    }

    viewModel.create(data, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on view creation"});
        }

        res.status(201).json({status:"success", msg:"Created new visualization", url:url});
    })
}

const deleteView = (req, res) => {

    const { url } = req.params;

    if(!url || url.length !== 36){
        return res.status(400).json({status:"error", msg:"One or more values are missing or invalid"});
    }

    const userID = req.id;

    if(!userID){
        return res.status(400).json({status:"error", msg:"Invalid user token"});
    }

    const data = {
        url: url,
        userID: userID
    }

    viewModel.delete(data, (err, result) => {

        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on deleting view"});
        }

        if(result.affectedRows === 1){
            res.json({status:"success", msg:"View deleted"});
        }else{
            res.status(400).json({status:"error", msg:"View was not deleted"});
        }
    })
}

const fetchViewByUrl = (req, res) => {

    const {url} = req.params;

    if(!url || url.length !== 36) {
        return res.status(400).json({status:"error", msg:"Invalid url"});
    }

    viewModel.fetchByUrl(url, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching view"});
        }

        if(result.length === 0) {
            return res.status(400).json({status:"error", msg:"Nothing found with that url"});
        }

        res.json({status:"success", view:result[0]});
    })
}

const fetchUsersViews = (req, res) => {

    const userID = req.id;

    if(!userID) {
        return res.json({status:"error", msg:"Invalid user id"});
    }

    viewModel.fetchAllByUserId(userID, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching users views"});
        }

        if(result.length === 0) {
            return res.status(400).json({status:"error", msg:"Nothing found for that user"});
        }

        res.json({status:"success", views:result});
    })
}

module.exports = {
    createView,
    deleteView,
    fetchViewByUrl,
    fetchUsersViews
}