const express = require("express");
const recipeControllers = require("../../controllers/recipe");
const upload = require("../../middleware/upload");


const route = express.Router();

route.get("/all", recipeControllers.getAllRecipes)
route.post("/post", upload.single("image"), recipeControllers.postAddRecipe)



module.exports = route;