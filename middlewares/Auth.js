// this file will contain the authentication missleware that will be the main here 
const jwt = require("jsonwebtoken");
const secret = "HOTAPE";

const jwtauth = async (req, res, next) => {
    try {

        let token = req.headers.authorization;
        var user;
        if (token) {
            try {

                user = jwt.verify(token, secret);
                req.user = user;
            }
            catch (e) {
                // console.log(e);
                return res.status(201).json({ message: "Invalid Token" });
            }
        }
        else {
            res.status(401).json({ message: "Unauthorised Access" });
        }
        next();

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = jwtauth;