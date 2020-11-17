const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req,res,next){
    var token = req.header('Authorization');
    if(!token) return res.status(401).json({
        data:null,
        message: 'Access Denied!'
    });
    try{
        token = token.split(' ')[1];
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        console.log(err.toString());
        res.status(401).json({
            data:null,
            message: 'Session expired! Please sign in again'
        });
    }
};