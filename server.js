require("dotenv").config();  // allows our project read variables from .env files

const express = require("express");
const sequelize = require("./config/database");
const path = require("path");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

//importing different routes
const userRoutes = require("./routes/api/user");
const recipeRoutes = require("./routes/api/recipe");
const authRoutes = require("./routes/api/auth");
const likeRoutes = require("./routes/api/like")

//models
const User = require("./models/user");
const Recipes = require("./models/recipe");

const app = express();

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());
app.use(cors());

// Create a static directory for our uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//setting a base path
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/like", likeRoutes)


const PORT = process.env.PORT || 5000

sequelize.sync()
    .then(result => {
        //create a server and listens
        app.listen(PORT, () =>  console.log("Server is running on PORT 5000"))
    })
        .catch((err) => console.log(err || "failed to connect"));
