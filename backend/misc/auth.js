const jwt = require('./jwt');

const auth = (req, res, next) => {

    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({status:"error",error:"Token is needed"});
    }

    const token = authorization.split(' ')[1];

    if(!token){
        return res.status(400).json({status:"error",error:"Token was not found"});
    }

    jwt.verifyToken(token, (err, result) => {
        if(err){
            if(err.message === "jwt malformed"){
                return res.status(400).json({status:"error",error:"Token is not JWT"});

            }

            return res.status(403).json({status:"error",error:"Token is invalid"});
        }

        req.id = result.id;
        req.username = result.username;

        next();
    })
}

module.exports = auth;