const express = require("express");
const emaiController = require("../../controllers/email");

const route = express.Router();

route.post("/post", emaiController.postEmail);

module.exports = route;