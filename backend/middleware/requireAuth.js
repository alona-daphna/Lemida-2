const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '\\..\\..\\.env' });


const requireAuth = (req, res, next) => {
    console.log('JWT:', req.cookies.jwt)
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({error: 'User is not authorized'})
    
    try {
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN)
        req.userId = decodedToken.id;
        next()
    } catch (error) {
        return res.status(401).json({error: error})
    }

}

module.exports = {requireAuth}