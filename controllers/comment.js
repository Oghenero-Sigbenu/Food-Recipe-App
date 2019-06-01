const Comment = require("../models/comment");
const Recipe = require("../models/recipe");
const User = require("../models/user");

//gettig all comments
exports.getComments = (req, res, next) => {
    Comment.findAll()
    .then(comment => {
        res.json(comment)
    })
    .catch(err => res.json({ success: false }))
}

//post a comment
exports.addComment = (req, res, next) => {
    const {comments} = req.body;
    const userId = req.id;
    // const RecipeId = req.recipeId;

    User.findByPk(userId)
    .then(user => {
        Comment.create({
           comments, userId
        })
        .then(comment => {
            res.json(comment)
        })
        .catch(err => res.json({msg: err.message || "failed"}))
    })
    .catch(err => res.json({ msg: err.message || "failed to create" }))
}