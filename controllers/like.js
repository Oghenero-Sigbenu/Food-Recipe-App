const User = require("../models/user");
const Like = require("../models/like");
const Recipe = require("../models/recipe");

exports.getLikes = (req, res, next) => {
	const id = req.params.id;

	Like.findAndCountAll({
		where: {
			RecipeId: id
		},
		include: [{
			all: true
		}]
	})
		.then((likes) => {
			res.json(likes)
		})
		.catch(err => res.json({ success: false }))
}

exports.postLike = (req, res, next) => {
	const {UserId,RecipeId, likes} = req.body;
	Like.findOne({
		where: {
			RecipeId
		}
	})
		.then(recipe => {
			Like.create({
				UserId,
				RecipeId, likes 
			})
				.then((like => {
					res.json({ like, success: true })
				}))
				.catch((err) => res.json({ message: "Failed 33", Error: err }));
		})
		.catch((err) => res.json({ message: "Failed", Error: err }));

}