const { v4: uuidv4 } = require('uuid');
const viewModel = require('../models/viewModel.js')

const createView = (req, res) => {

    const { views, isParallel, description } = req.body;

    if(typeof views !== "string" || typeof isParallel !== "number" || typeof description !== "string"){
        return res.status(400).json({status:"error", msg:"Väärä syöttötyyppi tai arvot puuttuvat"});
    }

    if(views.length > 30){
        return res.status(400).json({status:"error", msg:"Näkymät ovat liian pitkiä"});
    }

    if(description.length > 1024){
        return res.status(400).json({status:"error", msg:"Kuvaus on liian pitkä"});
    }

    const url = uuidv4();
    const userID = req.id;

    if(!userID){
        return res.status(400).json({status:"error", msg:"Virheellinen käyttäjätunnus"});
    }

    const visualizations = views.split(",");

    const validRoutes = ["v1","v3","v4","v5","v6","v7","v8","v9"];

    const validVisualizations = visualizations.filter(vis => {
        return validRoutes.indexOf(vis) !== -1;
    })

    if(validVisualizations.toString() !== views){
        return res.status(400).json({status:"error", msg:"Virheellinen syöttö näkymille"});
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
            return res.status(500).json({status:"error", msg:"Virhe näkymän luonnissa"});
        }

        res.status(201).json({status:"success", msg:"Uusi visualisaatio luotu", url:url});
    })
}

const deleteView = (req, res) => {

    const { url } = req.params;

    if(!url || url.length !== 36){
        return res.status(400).json({status:"error", msg:"Yksi tai useampi arvo puuttuu tai on virheellinen"});
    }

    const userID = req.id;

    if(!userID){
        return res.status(400).json({status:"error", msg:"Virheellinen käyttäjätunnus"});
    }

    const data = {
        url: url,
        userID: userID
    }

    viewModel.delete(data, (err, result) => {

        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Virhe näkymää poistaessa"});
        }

        if(result.affectedRows === 1){
            res.json({status:"success", msg:"Näkymä poistettiin"});
        }else{
            res.status(400).json({status:"error", msg:"Näkymää ei poistettu"});
        }
    })
}

const fetchViewByUrl = (req, res) => {

    const {url} = req.params;

    if(!url || url.length !== 36) {
        return res.json({status:"error", msg:"Virheellinen URL"});
    }

    viewModel.fetchByUrl(url, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Virhe haettaessa näkymää"});
        }

        if(result.length === 0) {
            return res.status(400).json({status:"error", msg:"Tällä URL-osoitteella ei löytynyt mitään"});
        }

        res.json({status:"success", view:result[0]});
    })
}

const fetchUsersViews = (req, res) => {

    const userID = req.id;

    if(!userID) {
        return res.json({status:"error", msg:"Virheellinen käyttäjätunnus"});
    }

    viewModel.fetchAllByUserId(userID, (err, result) => {
        if(err) {
            console.log(err);
            return res.status(500).json({status:"error", msg:"Virhe haettaessa käyttäjien näkymiä"});
        }

        if(result.length === 0) {
            return res.status(400).json({status:"error", msg:"Tälle käyttäjälle ei löytynyt mitään"});
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