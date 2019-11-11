const express = require("express");

const likeController = require("../../controllers/like");
const route = express.Router();

route.get("/all/:id", likeController.getLikes );
route.post("/add", likeController.postLike);

module.exports = route;

