const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const createView = (req, res) => {

    const { views, isParallel, title, descriptions } = req.body;

    if(typeof views !== "string" || typeof isParallel !== "boolean" || typeof title !== "string" || typeof descriptions !== "object"){
        return res.status(400).json({status:"error", msg:"Vääränlainen tietotyyppi tai ei tarpeeksi arvoja"});
    }

    if(views.length > 30 || title.length > 128){
        return res.status(400).json({status:"error", msg:"Otsikko tai näkymä on liian pitkä"});
    }

    for(const desc in descriptions){
        if(descriptions[desc].length > 512){
            return res.status(400).json({status:"error", msg:"Jonkin kuvaajan kuvaus on liian pitkä"});
        }
    }

    if(views.length < 2){
        return res.status(400).json({status:"error", msg:"Näkymiä ei ole tarpeeksi"});
    }

    if(title.length < 3){
        return res.status(400).json({status:"error", msg:"Otsikko on liian lyhyt"});
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
        return res.status(400).json({status:"error", msg:"Vääräänlainen näkymä"});
    }

    const orderedDesc = {};

    for(let i = 0; i < visualizations.length; i++) {
        orderedDesc[visualizations[i]] = descriptions[visualizations[i]];
    }

    const data = {
        url: url,
        userID: userID,
        views: views,
        isParallel: isParallel,
        title: title,
        desc1: orderedDesc[visualizations[0]] || "",
        desc2: orderedDesc[visualizations[1]] || "",
        desc3: orderedDesc[visualizations[2]] || "",
        desc4: orderedDesc[visualizations[3]] || "",
        desc5: orderedDesc[visualizations[4]] || "",
        desc6: orderedDesc[visualizations[5]] || "",
        desc7: orderedDesc[visualizations[6]] || ""
    }

    viewModel.create(data, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Virhe näkymän luonnissa"});
        }

        res.status(201).json({status:"success", msg:"Näkymä luotiin onnistuneesti", url:url});
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