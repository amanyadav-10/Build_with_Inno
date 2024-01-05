const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
const connectDB = require("./config/db")
connectDB();

const UserRouter = require("./routes/userMana");

app.use(express.json());

app.use('/api', UserRouter);


app.get('/', (req, res) => {
    console.log("My name is Aman Yadav");
    res.send("The Server is Running on the Port 8000")
})
app.listen(8000, () => {
    console.log("The Server is Up and running");
})
