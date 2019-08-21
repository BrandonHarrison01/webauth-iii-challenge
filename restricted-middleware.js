const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.status(401).json({ oops: 'try again'})
            } else {
                next();
            }
        })
    } else {
        res.status(400).json({ message: 'need a token' })
    }
}