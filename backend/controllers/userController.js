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
    let respo = userModel.register(password, username)
    if(respo === "Success"){
        return res.json({msg:"succesfully created user"})
    }else{
        return respo
    }
}


module.exports = {
    hello,
    register
}