const jwt = require('jsonwebtoken');

const createToken = (id, username, cb) => {
    cb(null, jwt.sign({id:id, username:username}, process.env.TOKEN));
}

const verifyToken = (token, cb) => {
    jwt.verify(token, process.env.TOKEN, (err, result) => {
        cb(err, result);
    })
}

module.exports = {
    createToken,
    verifyToken
}