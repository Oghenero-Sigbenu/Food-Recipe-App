const express = require("express");
const userController = require("../../controllers/user")

const route = express.Router();

route.post("/register", userController.postAddUser);
route.get("/register", userController.getAllUser);


module.exports = route;