const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

function verifyToken(req, res, next) {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = verifyToken;

/*successfully created the middleware/auth.js file with the authentication middleware code. 
This middleware will be used to verify JWT tokens and protect routes that require authentication in your Node.js application. 
You can continue building your application and use this middleware where needed for authentication purposes.*/