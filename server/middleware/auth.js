const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"].split(' ')[1];
    if(!token) {
        res.send("you require a valid token..!")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                console.log(err)
                res.send({auth: false, message:"Need valid token"})
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = verifyJWT