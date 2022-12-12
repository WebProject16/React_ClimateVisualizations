const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require("../misc/jwt");
const validator = require('validator');

const register = (req, res) => {
    const {username, password, password_rpt} = req.body

    if(typeof username !== 'string' || typeof password !== 'string' || typeof password_rpt !== 'string'){
        return res.status(400).json({msg:'Syötteet eivät kelpaa'})
    }
    
    if(!username){
        return res.status(400).json({
            msg:'Anna käyttäjänimi'
        })
    }
    if(!password || password.length < 5){
        return res.status(400).json({
            msg:'Salasanassa on oltava yli 5 merkkiä'
        })
    }
    if(!password_rpt || password !== password_rpt){
        return res.status(400).json({
            msg:'Salasanat eivät täsmää'
        })
    }

    if(username.length > 30){
        return res.status(400).json({
            msg:'Käyttäjänimi on liian pitkä'
        })
    }

    if(username.length < 3){
        return res.status(400).json({
            msg:'Käyttäjänimi on liian lyhyt'
        })
    }

    if(!validator.isAlphanumeric(username)){

        return res.status(400).json({
            msg:'Käyttäjänimi ei voi sisältää erikoismerkkejä'
        })
    }

    if(!validator.isStrongPassword(password, {minLength: 6, minLowercase: 0, minUppercase: 0, minSymbols: 0, minNumbers: 1})){

        return res.status(400).json({
            msg:'Salasana ei kelpaa'
        })
    }

    bcrypt.hash(password, 10, (err, hash) => {

        if(err){
            console.log(err);
            return res.status(500).json({msg:'Virhe rekisteröitäessä käyttäjää'}) 
        }

        userModel.register(username, hash, (err, dbRes) => {
            if(err){
                if(err.errno == 1062)
                    return res.status(400).json({msg:'Käyttäjänimi on jo käytössä'}) 
    
                return res.status(500).json(err)
            }else{
                return res.status(200).json({msg:'Uusi käyttäjä rekisteröity onnistuneesti'})
            }
        })
    })
}

const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:"error",msg:"Yksi tai useampi kenttä puuttuu"})
    }

    if(typeof username !== 'string' || typeof password !== 'string'){
        return res.status(400).json({msg:'Syötteet eivät kelpaa'})
    }

    userModel.getUserByName(username, (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).json({status:"error", msg:err})
        }

        if(!result[0]){
            return res.status(400).json({status:"error", msg:"Väärä käyttäjänimi tai salasana"})
        }

        bcrypt.compare(password, result[0].password, (err, correctPassword) => {
            if(err){
                console.log(err)
                return res.status(500).json({status:"error", msg:"Virhe verrattaessa salasanoja"})
            }

            if(!correctPassword){
                return res.status(400).json({status:"error", msg:"Väärä käyttäjänimi tai salasana"})
            }

            jwt.createToken(result[0].userID, result[0].username, (err, token) => {
                if(err){
                    console.log(err)
                    return res.status(400).json({status:"error", msg:"Virhe luotaessa valtuutustunnusta"})
                }

                res.json({status:"success", msg:"Sisäänkirjautuminen onnistui", token:token})
            })
        })
    })

}

const deleteUser = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:"error",msg:"Yksi tai useampi kenttä puuttuu"});
    }

    if(typeof username !== 'string' || typeof password !== 'string'){
        return res.status(400).json({msg:'Syötteet eivät kelpaa'})
    }

    userModel.getUserByName(username, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:err});
        }

        if(!result[0]){
            return res.status(400).json({status:"error", msg:"Väärä käyttäjänimi tai salasana"});
        }

        bcrypt.compare(password, result[0].password, (err, correctPassword) => {
            if(err){
                console.log(err);
                return res.status(500).json({status:"error", msg:"Virhe verrattaessa salasanoja"});
            }

            if(!correctPassword){
                return res.status(400).json({status:"error", msg:"Väärä käyttäjänimi tai salasana"});
            }

            userModel.deleteUserByName(username, (err) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({status:"error", msg:err});
                }
             
                res.json({status:"success", msg:"Käyttäjä poistettu onnistuneesti"});

            })

        })
    })

}

const checkToken = (req, res) => {
    res.json({status:"success",msg:"Tunnus on kelvollinen"})
}

module.exports = {
    register,
    login,
    deleteUser,
    checkToken
}