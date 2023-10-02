const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"].split(' ')[1];
        if(!token) {
            res.send("you require a valid token..!")
        } else {
            jwt.verify(token, "jwtSecret", (err, decoded) => {
                if(err) {
                    res.send({auth: false, message:"Need valid token"})
                    res.redirect('/');
                } else {
                    req.userId = decoded.id;
                    next();
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = verifyJWT