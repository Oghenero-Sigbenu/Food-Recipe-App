const express = require("express");
const authController = require("../../controllers/auth")

const route = express.Router();

route.post("/", authController.login);
route.get("/", authController.getCurrentUser);


module.exports = route; 