const express = require("express");

const likeController = require("../../controllers/like");
const route = express.Router();

route.get("/all", likeController.getLikes );
route.post("/:id", likeController.postLike);

module.exports = route;

