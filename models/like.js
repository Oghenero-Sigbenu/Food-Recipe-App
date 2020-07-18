const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const Recipes = require("./recipe");

class Like extends Sequelize.Model { }
Like.init({
	likes: {
		type: Sequelize.INTEGER(),
		allowNull: false,
		defaultValue: 0
	}
}, { sequelize });

Like.belongsTo(User);
Like.belongsTo(Recipes);

module.exports = Like;