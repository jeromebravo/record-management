const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // get token
    const token = req.header('auth-token');

    // check if token does not exists
    if(!token) {
        return res.status(401).json({msg: 'You must be logged in'});
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({msg: 'Invalid token'});
    }
}