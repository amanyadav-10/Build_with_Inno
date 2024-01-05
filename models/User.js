const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Username is Required"]
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // enum: ['user', 'admin'],
        default: 'user'
    },

    image: {
        type: String
    }
})

// The above is the schema of the user that is going to be used in the project and , we will perfom all the operation on the given schema only 
const User = mongoose.model('User', UserSchema);
module.exports = User;

// This the User Schema , we have to perform make all the APIs on the regards of this schema 