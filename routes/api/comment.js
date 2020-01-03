const express = require("express");
const commentController = require("../../controllers/comment");
// const authenticate = require("../../middleware/auth")


const route = express.Router();

route.get("/all", commentController.getComments);
route.post("/add",  commentController.addComment)
route.get("/:id", commentController.getRecipeComment);
route.delete("/de/:id", commentController.deleteComment);

module.exports = route;