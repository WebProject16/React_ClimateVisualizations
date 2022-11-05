const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require("../misc/jwt");


const hello = (req, res) => {
    let s = userModel.hello()
    res.send(s)
}

const register = (req, res) => {
    let{username, password,password_rpt}=req.body
    
    if(!username){
        return res.status(400).send({
            msg:'please enter an username'
        })
    }
    if(!password || password.lenght < 5){
        return res.status(400).send({
            msg:'password must have more than 4 characters'
        })
    }
    if(!password_rpt || password != password_rpt){
        return res.status(400).send({
            msg:'passwords must match'
        })
    }
    userModel.register(username, password, function(err, dbRes){
        if(err){
            if(err.errno == 1062)
                return res.status(400).send({msg:'username already taken'}) 

            return res.status(500).send(err)
        }else{
            return res.status(200).json({msg:'Successfully registered new user'})
        }
    })
    
}

const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:"error",msg:"One or more fields are needed"})
    }

    userModel.getUserByName(username, (err, result) => {
        if(err){
            console.log(err)
            return res.status(500).json({status:"error",msg:err})
        }

        if(!result[0]){
            return res.status(400).send({status:"error", msg:"Invalid username or password"})
        }

        bcrypt.compare(password, result[0].password, (err, correctPassword) => {
            if(err){
                console.log(err)
                return res.status(500).json({status:"error",msg:"Error on comparing passwords"})
            }

            if(!correctPassword){
                return res.status(400).send({status:"error", msg:"Invalid username or password"})
            }

            jwt.createToken(result[0].userID, result[0].username, (err, token) => {
                if(err){
                    console.log(err)
                    return res.status(400).send({status:"error", msg:"Error on creating authorization token"})
                }

                res.json({status:"success", msg:"Successfully logged in", token:token})
            })
        })
    })

}

module.exports = {
    hello,
    register,
    login
}