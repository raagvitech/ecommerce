const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader === null || authHeader === undefined){
        return res.status(401).json({status : 401, message : "Unauthorized"})
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(401).json({status:401, message:"UnAuthorized"})
        req.user = user;
       next();
    })
}

module.exports =  authMiddleware;