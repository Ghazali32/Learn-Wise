const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../constant/Password')

const middleware = (req,res,next) =>{
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(403).json({
            error : 'Invalid Token'
        })
        return
    }

    const token = bearer.split(" ")[1];

    try{
        const isVerified = jwt.verify(token,JWT_SECRET)
        req.userId = isVerified.userId
        next()
    }catch(error)
    {
        res.status(403).json({
            error
        })
    }
}

module.exports = middleware