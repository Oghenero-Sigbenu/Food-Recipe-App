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
}, {sequelize,sequelize,
    modelName: 'comment',
    freezeTableName: true,});

Recipes.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Recipes);

module.exports = Comment;