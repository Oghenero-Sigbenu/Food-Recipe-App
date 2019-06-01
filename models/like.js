const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const Recipes = require("./recipe");

class Like extends Sequelize.Model {}
Like.init({}, {sequelize});

// User.hasMany(Like);
// Recipes.hasMany(Like);

module.exports = Like;