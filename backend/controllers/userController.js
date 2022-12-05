const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require("../misc/jwt");
const validator = require('validator');

const register = (req, res) => {
    const {username, password, password_rpt} = req.body

    if(typeof username !== 'string' || typeof password !== 'string' || typeof password_rpt !== 'string'){
        return res.status(400).json({msg:'Inputs are not valid'})
    }
    
    if(!username){
        return res.status(400).json({
            msg:'Please enter an username'
        })
    }
    if(!password || password.length < 5){
        return res.status(400).json({
            msg:'Password must have more than 5 characters'
        })
    }
    if(!password_rpt || password !== password_rpt){
        return res.status(400).json({
            msg:'Passwords must match'
        })
    }

    if(username.length > 30){
        return res.status(400).json({
            msg:'Username is too long'
        })
    }

    if(username.length < 3){
        return res.status(400).json({
            msg:'Username is too short'
        })
    }

    if(!validator.isAlphanumeric(username)){

        return res.status(400).json({
            msg:'Username cannot contain special characters'
        })
    }

    if(!validator.isStrongPassword(password, {minLength: 6, minLowercase: 0, minUppercase: 0, minSymbols: 0, minNumbers: 1})){

        return res.status(400).json({
            msg:'Password is not valid'
        })
    }

    bcrypt.hash(password, 10, (err, hash) => {

        if(err){
            console.log(err);
            return res.status(500).json({msg:'Error on registering user'}) 
        }

        userModel.register(username, hash, (err, dbRes) => {
            if(err){
                if(err.errno == 1062)
                    return res.status(400).json({msg:'Username already taken'}) 
    
                return res.status(500).json(err)
            }else{
                return res.status(200).json({msg:'Successfully registered new user'})
            }
        })
    })
}

const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:"error",msg:"One or more fields are missing"})
    }

    if(typeof username !== 'string' || typeof password !== 'string'){
        return res.status(400).json({msg:'Inputs are not valid'})
    }

    userModel.getUserByName(username, (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).json({status:"error", msg:err})
        }

        if(!result[0]){
            return res.status(400).json({status:"error", msg:"Invalid username or password"})
        }

        bcrypt.compare(password, result[0].password, (err, correctPassword) => {
            if(err){
                console.log(err)
                return res.status(500).json({status:"error", msg:"Error on comparing passwords"})
            }

            if(!correctPassword){
                return res.status(400).json({status:"error", msg:"Invalid username or password"})
            }

            jwt.createToken(result[0].userID, result[0].username, (err, token) => {
                if(err){
                    console.log(err)
                    return res.status(400).json({status:"error", msg:"Error on creating authorization token"})
                }

                res.json({status:"success", msg:"Successfully logged in", token:token})
            })
        })
    })

}

const deleteUser = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:"error",msg:"One or more fields are missing"});
    }

    if(typeof username !== 'string' || typeof password !== 'string'){
        return res.status(400).json({msg:'Inputs are not valid'})
    }

    userModel.getUserByName(username, (err, result) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:err});
        }

        if(!result[0]){
            return res.status(400).json({status:"error", msg:"Invalid username or password"});
        }

        bcrypt.compare(password, result[0].password, (err, correctPassword) => {
            if(err){
                console.log(err);
                return res.status(500).json({status:"error", msg:"Error on comparing passwords"});
            }

            if(!correctPassword){
                return res.status(400).json({status:"error", msg:"Invalid username or password"});
            }

            userModel.deleteUserByName(username, (err) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({status:"error", msg:err});
                }
             
                res.json({status:"success", msg:"Successfully deleted user"});

            })

        })
    })

}

const checkToken = (req, res) => {
    res.json({status:"success",msg:"Token is valid"})
}

module.exports = {
    register,
    login,
    deleteUser,
    checkToken
}