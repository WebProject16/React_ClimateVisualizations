const userModel = require('../models/userModel.js');

const hello = (req, res) => {
    let s = userModel.hello()
    res.send(s)
}


module.exports = {
    hello
}