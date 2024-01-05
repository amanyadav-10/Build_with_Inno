const express = require("express");
const UserRouter = express.Router();
const { modify, view, viewAll, deleteUser, deleteAll } = require("../controllers/Access");
const { signUp, login, adminSign } = require("../controllers/userMana");
const jwtauth = require("../middlewares/Auth");



UserRouter.post("/adminSignup", jwtauth, adminSign);
UserRouter.post("/signup", signUp);
UserRouter.post("/login", login);
UserRouter.put("/modify/:id", jwtauth, modify);
UserRouter.get("/view/all", jwtauth, viewAll);
UserRouter.get("/view/:id", jwtauth, view);

UserRouter.delete("/deleteUser/:id", jwtauth, deleteUser);
UserRouter.delete("/deleteAll", jwtauth, deleteAll)


module.exports = UserRouter;