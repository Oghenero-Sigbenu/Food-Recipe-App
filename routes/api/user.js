const express = require("express");
const userController = require("../../controllers/user");
const upload = require("../../middleware/upload");


const route = express.Router();

route.post("/",upload.single('imageurl'), userController.postAddUser);
route.get("/all", userController.getAllUser);


module.exports = route; 