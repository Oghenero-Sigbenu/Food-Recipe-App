const Recipes = require('../models/recipe');//initates creation of table in the database 
const User = require("../models/user");

exports.getAllRecipes = (req, res, next) => {
    Recipes.findAll()
        .then(recipe => {
            res.json(recipe)
            // console.log(recipe)
        })
        .catch(err => res.json({ msg: failed, error: err }))
}


exports.postAddRecipe = (req, res, next) => {

    console.log('i dey here')

    const { title, description, steps, ingredients } = req.body;
    
    const userId = req.id;
    let imageurl;

    //error message pops up when fields are empty
    if (!title || !description || !steps || !ingredients) {
        res.json({ msg: "All fields are required" })
    } 
    else {
        if(req.file){
		    imageurl = req.file.path;
        }

        User.findByPk(userId)
            .then(user => {
                Recipes.create({ title, description, steps, ingredients, imageurl })
            .then(recipe => {
                res.json(recipe)
            })
            .catch(err => res.json({ msg: err.message ||"failed to create" }))
        })
        .catch(err => res.json({ msg: err.message ||"failed to create" }))
    
   }

}
