const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret = "HOTAPE"



const view = async (req, res) => {
    try {

        const id = req.params.id;
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        const userid = await User.findById(id);
        if (!userid) {
            return res.status(404).send("User not found");
        }
        if (userauth.role !== 'admin' && userauth.email !== userid.email) {
            return res.status(403).json({ message: "Unauthorised Access , The person is either not the admin or is trying to View the data of someone else" });
        }

        res.status(200).send(userid);
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);

    }

}

const viewAll = async (req, res) => {
    // This is a API that can be run by the admin only and not the user , so we have to keep a check on it 
    try {
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        if (userauth.role !== 'admin') {
            return res.status(401).json({ message: "The user is not the admin" });
        }
        const users = await User.find();
        res.status(200).json(users);

    }
    catch (e) {
        console.log(e);
        res.send(500).send(e);

    }
}

const modify = async (req, res) => {
    try {
        const { name, image } = req.body;
        const id = req.params.id;
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        const userid = await User.findById(id);
        if (!userid) {
            return res.status(404).send("User not found");
        }

        if (userauth.role !== 'admin' && userauth.email !== userid.email) {
            return res.status(403).json({ message: "Unauthorised Access , The person is either not the admin or is trying to change the data of someone else" });
        }

        userid.name = name;
        userid.image = image;
        // the modify is a put function because I have to basically change the data that is there in the data base
        console.log(userid);
        res.status(200).send("User Updated Succesfully");
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
}



const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        const userid = await User.findById(id);
        if (!userid) {
            return res.status(404).send("User not found");
        }
        if (userauth.role !== 'admin' && userauth.email !== userid.email) {
            return res.status(403).json({ message: "Unauthorised Access , The person is either not the admin or is trying to Delete the data of some other User" });
        }

        const deletedUser = await User.findByIdAndDelete({ "_id": id });
        res.status(200).send(deletedUser);

    }
    catch (e) {
        console.log(e);
        res.send(500).send(e);
    }
}

const deleteAll = async (req, res) => {
    try {
        const user = req.user;
        const userauth = await User.findOne({ "email": user.email });
        if (userauth.role !== 'admin') {
            return res.status(401).json({ message: "The User is not the admin" });
        }
        const users = await User.deleteMany({});
        res.status(200).json(users);

    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}


module.exports = { modify, view, viewAll, deleteUser, deleteAll };