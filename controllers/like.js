const User = require("../models/user");
const Like = require("../models/like");
const Recipe = require("../models/recipe");

exports.getLikes = (req, res, next) => {
    Like.findAll()
    .then((likes) => {
        res.json(likes)
    })
    .catch(err => res.json({ success: false }))
}

exports.postLike = (req, res, next) => {
    Like.create({
        UserId: 1,
        RecipeId: 1
    })
    .then((like => {
        res.json({like, success: true})
    }))
    .catch((err) => res.json({ message: "Failed", Error: err }));

}