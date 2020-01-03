const Comments = require("../models/comment");
const Recipe = require("../models/recipe");
const User = require("../models/user");

//gettig all comments
exports.getComments = (req, res, next) => {
    Comments.findAll()
    .then(comment => {
        res.json(comment)
    })
    .catch(err => res.json({ success: false }))
}

//post a comment
exports.addComment = (req, res, next) => {
  const {comments,RecipeId,UserId} = req.body;
   Comments.findOne({
       where:{RecipeId}
    })
    .then(commentData => {
			// if(!commentData){
				Comments.create({
						comments,UserId,RecipeId
				})
				.then(comment => {
						res.status(200).json({msg:"Successfully created", data:comment})
				})
				.catch(err => res.json({msg: err.message || "failed"}))
			// }
		// 	else {
		// 		return res.status(400).json({ msg: "Comment already exists" });
		// }
    })
    .catch(err => res.json({ msg: err.message || "failed to create" }))
};

exports.getRecipeComment = (req, res, next) => {
	const RecipeId = req.params.id;
	Comments.findAll({
			where: {
				RecipeId
			},
			include: [{
					all: true
			}]
	})
			.then((comment) => {
				res.status(200).json({ msg: "Comment found succesfully", data: comment });
			})
			.catch((err) => {
					return res.status(500).json({ msg: "Something went wrong", error: err });
			})
};

exports.deleteComment = (req, res, next) => {
	const id = req.params.id;
	Comments.findByPk(id)
	.then((comment ) => {
		if(comment){
		comment.destroy()
		.then((res) =>{
			res.status(200).json({msg:"deleted succefully" || err.message})
		})
		.catch((err) => {
			console.log(err)
		})
	}else{
		res.status(200).json({msg:"Comment not found" || err.message})
	}
	})
	.catch((err) => {
		console.log(err)
	})
}