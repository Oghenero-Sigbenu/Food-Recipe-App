const Recipe = require('../models/recipe');//initates creation of table in the database 
const User = require("../models/user");
const httpStatus = require("../util/httpStatus");
const Like = require("../models/like");

//get all recipes
exports.getAllRecipes = (req, res, next) => {
    Recipe.findAll({
        include: [
			{
				all: true,
				attributes: { exclude: ["password", "createdAt", "updatedAt"] }
			}]
    })
        .then(recipe => {
            res.json(recipe)
            // console.log(recipe)
        })
        .catch(err => res.json({ msg: failed, error: err }))
        };

//get recipe by Id
exports.getRecipeById = (req, res, next) => {
    const recipeId = req.params.id;
    Recipe.findOne({
        where:{
            id: recipeId
        },
        include: [
            {
                all: true,
                attributes: { exclude:["password","updatedAt"]}
            }
        ]
    })
    .then(recipe => {
        if(!recipe) {
            res.status(httpStatus.NOT_FOUND).json({success: false, message: "Recipe not found"})
        }
        else{
            res.json(recipe)
        }
    })
    .catch(err => res.status(400).json({success: false, message: "Error Occured"}));
}

exports.getUserRecipes = (req,res,next)=>{
	const userId = req.userId;
    Recipe.findAll({
        where:{
            userId
		},
		include: [
			{
				all: true,
				attributes: { exclude: ["password", "createdAt", "updatedAt"] }
			}
		]
    })
    .then((recipe)=>{
        res.json(recipe)
    })
    .catch(err=> res.json({
        success:false
    }))
}

exports.postAddRecipe = (req, res, next) => { 
    const { title, description, steps, ingredients,UserId } = req.body;
    let imageurl;
    if(req.path){
                imageurl = req.file.path;
            }
    //error message pops up when fields are empty
    // if (!title || !description || !steps || !ingredients) {
    //     res.json({ msg: "All fields are required" })
    // }
    // else {
       User.findByPk(UserId)
            .then(user => {
                Recipe.create({ title, description, steps, ingredients, imageurl, UserId })
                .then(recipe => {
                    res.status(200).json({msg: "succssfully created ",data:recipe})
                })
                .catch(err => res.json({ msg: err.message || "failed to create" }))
                 })
            .catch(err => res.json({ msg: err.message || "User not found" }))
                }
                // }

//delete a single recipe by id
exports.deleteRecipe = (req, res, next) => {
    const recipeId = req.params.id;
    Recipe.findPk(recipeId)
    .then(recipe => {
        if(recipe.userId !== req.userId) {
            res.status(401).json({msg: 'You cannot perform this action'})
        }
        else{
            recipe.destroy()
       .then(() => {
           res.json({success: true}) })
        .catch(err => res.json({success: false}))
        }
    })
    .catch(err => res.json({success: false}))

}

//updating a recipe
exports.updateRecipe = (req, res, next) => {
    const { title, description, steps, ingredients } = req.body;

    const recipeId = req.params.id;
    const userId = req.id;
    let imageurl = null;
    if (req.file) {
        imageurl = req.file.path;
    }
    Recipe.findByPk(recipeId)
        .then(recipe => {
            if(recipe.userId !== userId){
                res.json({msg: "Recipe not created by you"})
            }
            else{
                recipe.update({
                    title, description, steps, ingredients, imageurl
                })
                .then(recipe => {
                    res.json(recipe);
                })
                .catch((err)=>next(err))
            }
        })
        .catch(err =>
			res.status(500).json({ msg: "Recipe does not exist", error: err })
		);
};

exports.postLikeRecipe = (req, res, next) => {
    const { userId, recipeId } = req.body;
    Recipe.findByPk(recipeId)
        .then(async (recipe) => {
            if (!recipe) {
                return res.status(httpStatus.NOT_FOUND)
                    .json({ message: "recipe does not exist" })
            }

            try {
                // if the user aready liked the recipe
                // decrement the likes count
                // else, increment it
                const liked = await Like.findOne({ UserId: userId, RecipeId: recipeId });
                if (liked) {
                    // unlike
                    recipe.likes = recipe.likes - 1;
                    await recipe.save();
                    await Like.destroy({ UserId: userId, RecipeId: recipeId });
                    return res.json({ message: `${recipe.title} liked successfully`});
                }

                // create like record
                const like = await Like.create({ UserId: userId, RecipeId: recipeId, likes: 1 });
                // increment like count
                recipe.likes = recipe.likes + 1;
                recipe = await recipe.save();
                res.json({ message: "recipe liked succesfully", data: recipe })
            } catch (error) {
                return next(error);
            }
        }).catch(next)
}
