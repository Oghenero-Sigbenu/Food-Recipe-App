require("dotenv").config();  // allows our project read variables from .env files

const express = require("express");
const sequelize = require("./config/database")
// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

//importing different routes
const userRoutes = require("./routes/api/user");

const app = express();

app.use("api/user", userRoutes)





app.use("/", (req, res, next) => {
    
})







const PORT = process.env.PORT || 5000


sequelize.sync()
    .then(result => {
        //create a server and listens
        app.listen(PORT, () =>  console.log("Server is running on PORT 5000"))
    })
        .catch((err) => console.log(err));
