const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"].split(" ")[1]; 
    if (!token) {
      return res.json({ sucess: false, message: "You require JWT token." })
    } else {
      jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
          res.send({ sucess: false, message: "You requires valid JWT token." });
        } else {
          req.userId = decoded.id;
          next();
        }
      });
    }
  } catch (err) {
    res.send({ auth: false, message: "You require JWT token." });
  }
};

module.exports = verifyJWT;
