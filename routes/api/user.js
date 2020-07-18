const express = require("express");
const userController = require("../../controllers/user");


const route = express.Router();

route.post("/login", userController.login);
route.get("/all", userController.getAllUser);
route.post("/", userController.signup);


module.exports = route;