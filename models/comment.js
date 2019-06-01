const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const Recipes = require("./recipe");

class Comment extends Sequelize.Model {}
Comment.init({
    comments :{
        type: Sequelize.STRING(),
        allowNull: false
    },
}, {sequelize});

// User.hasMany(Comment);
// Recipes.hasMany(Comment);

module.exports = Comment;