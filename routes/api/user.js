const express = require("express");
const userController = require("../../controllers/user")

const route = express.Router();

route.post("/reg", userController.postAddUser);
route.get("/all", userController.getAllUser);


module.exports = route; 