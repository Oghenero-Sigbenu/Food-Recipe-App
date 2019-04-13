const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model {}
    
User.init({
        firstname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false
        },
        username:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl:{
            type: Sequelize.STRING,
            allowNull: true
        },
    },{sequelize});

    module.exports = User;