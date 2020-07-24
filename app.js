require("dotenv").config();  // allows our project read variables from .env files

const express = require("express");
const path = require("path");

// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");

//importing different routes
const userRoutes = require("./routes/api/user");
const recipeRoutes = require("./routes/api/recipe");
const authRoutes = require("./routes/api/auth");
const likeRoutes = require("./routes/api/like");
const commentRoutes = require("./routes/api/comment");
const emailRoutes = require("./routes/api/email");

//models
const User = require("./models/user");
const Recipes = require("./models/recipe");

const app = express();

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

// Create a static directory for our uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//setting a base path
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/email", emailRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

app.use('*', (req, res, next) => {
    res.json({ message: 'Invalid url'});
});

// develoment error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV == "production") {
        // app.use(express.static("client/build"));

        // app.get("*", (req, res) => {
        //     res.sendFile(path.resolve(__dirname,"client","build","index.html"))
        // })
        return next(err)
    }
    return res.json({ message: err.message || "an error occured", error: err });
});

// Production error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.json({ message: "Something wrong" });
});

process.on('unhandledRejection', (reason) => {
    throw reason;
});

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
    process.kill(process.pid, 'SIGTERM');
});

module.exports = app;