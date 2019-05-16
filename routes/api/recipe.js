const express = require("express");
const recipeControllers = require("../../controllers/recipe")
const upload = require("../../middleware/upload");
const authenticate = require("../../middleware/auth")

// //importing multer
// const multer = require('multer')
// var upload = multer({ dest: 'uploads/' })

const route = express.Router();


route.get("/all", recipeControllers.getAllRecipes)
route.get("/:id", recipeControllers.getRecipeById)
route.delete("/delete/:id",authenticate, recipeControllers.deleteRecipe)
route.put("/edit/:id",authenticate, recipeControllers.updateRecipe)
route.post("/post", authenticate, upload.single('imageurl'), recipeControllers.postAddRecipe)

module.exports = route;
