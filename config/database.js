const Sequelize = require("sequelize");

//Creates a Sequelize instance and sets the database config
const sequelize = new Sequelize("food_recipes","root", process.env.MYSQL_PASSWORD,{
    host:"localhost",
    dialect:"mysql",
    // socketPath: '/var/run/mysqld/mysqld.sock'
});

module.exports = sequelize;
