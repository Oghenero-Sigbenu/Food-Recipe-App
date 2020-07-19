require("dotenv").config();
const Sequelize = require("sequelize");


//Creates a Sequelize instance and sets the database config
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    // socketPath: '/var/run/mysqld/mysqld.sock',
    port: process.env.DB_PORT
});

module.exports = sequelize;


// mysql://bfe6ddfaaeab71:bc027240@us-cdbr-iron-east-05.cleardb.net/heroku_1ef6f32a34d8bf1?reconnect=true