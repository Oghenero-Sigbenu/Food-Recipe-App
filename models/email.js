const Sequelize = require("sequelize");
const sequelize = require("../config/database")
//  const User = require("./user")


class Email extends Sequelize.Model{}
    Email.init({
        email:{
            type: Sequelize.STRING(),
            allowNull: false
        }
    },{sequelize})

    module.exports = Email;