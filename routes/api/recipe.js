const express = require("express");
const recipeControllers = require("../../controllers/recipe")
// const upload = require("../../middleware/upload");
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const route = express.Router();

route.get("/all", recipeControllers.getAllRecipes)
route.post("/post", upload.single('imageurl'), recipeControllers.postAddRecipe)
// route.post("/post", recipeControllers.postAddRecipe)

module.exports = route;
