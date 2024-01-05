const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret = "HOTAPE"

// This is the signup Api for the creation of the user info 

const signUp = async (req, res) => {
    try {
        const user1 = await User.findOne({ "email": req.body.email });
        const user2 = await User.findOne({ "phone": req.body.phone });
        const user3 = await User.findOne({ "name": req.body.name });
        if (user1) {
            return res.status(401).send("Email Id already Registered");
        }
        if (user2) {
            return res.status(401).send("Phone Number already in use");
        }
        if (user3) {
            return res.status(401).send("Username Not available");
        }
        if (req.body.role !== 'user') {
            return res.status(401).send("Cannot register an Admin");
        }
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(req.body);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(200).json({ message: "User Registered Succesfully" });

    }

    catch (err) {

        console.log(err);
        res.status(500).json({ message: err });

    }
}

const adminSign = async (req, res) => {
    try {
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        if (userauth.role !== 'admin') {
            return res.status(403).send("An admin can only be created by other admin");
        }

        const user1 = await User.findOne({ "email": req.body.email });
        const user2 = await User.findOne({ "phone": req.body.phone });
        const user3 = await User.findOne({ "name": req.body.name });
        if (user1) {
            return res.status(401).send("Email Id already Registered");
        }
        if (user2) {
            return res.status(401).send("Phone Number already in use");
        }
        if (user3) {
            return res.status(401).send("Username Not available");
        }
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(req.body);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(200).json({ message: "Admin Registered Succesfully" });

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const login = async (req, res) => {
    try {
        // we need to compare the email and the password for the login
        const user = await User.findOne({ "email": req.body.email });
        const pass = await req.body.password;
        // const useremail = user.email;

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            return res.status(401).send("Invalid Email Id or Password");
        }
        // if the password is correct we have to generate the token for verification and authentication
        const token = jwt.sign({ email: user.email, password: user.password }, secret);
        // console.log(token);
        res.status(200).json(token);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);

    }
}


module.exports = { signUp, login, adminSign };


// This is a little logical concept here I have to just manipulate the logic and check if I can get the data or not  