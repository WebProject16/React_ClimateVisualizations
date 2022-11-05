const userModel = require('../models/userModel.js');
const { json } = require("express/lib/response");

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
            return res.status(200).json(dbRes)
        }
    })
    
}


module.exports = {
    hello,
    register
}