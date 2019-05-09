const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken

const User = require("../models/user"); //importing the models

//user signUp and login
exports.postAddUser = (req, res, next) => {
    const { firstname, lastname, email,
        username, password, imageUrl } = req.body;
    console.log("love");
    // if either of the fields are empty render status(404)
    // else find a user by the email
    if (!firstname || !lastname || !email || !username || !password) {
        res.status(400).json("All fields are required")
    } else {
        //serch if the email already exist
        User.findOne({
            where: {
                email
            } 
        }) 
        
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            } 
            else {
                //pasword is hashed
                let hashedPassword;
                try {
                    const salt = bcrypt.genSaltSync(10);
                    hashedPassword = bcrypt.hashSync(password, salt);
            } catch (error) {
                    throw error;
                }
                //user is created
                User.create({
                    firstname, lastname, email,
                    username, password: hashedPassword, imageUrl
                })

            .then(user => {
                //logins in the user and assigns a token
            const token = jwt.sign(
                { id: user.id },process.env.AUTH_SECRET_KEY,{ expiresIn: "2h"});
            const authenticatedUser = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username
                } 
                return res.json({
                    access_token :token,
                    user: authenticatedUser
                    });  
                    })
            .catch(err => res.json({ msg: err.message || "failed to create account" }))
                }
            })
            .catch(err => res.json({ msg: err.message || "failed to create account" }))
    }
};

exports.getAllUser = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.json(users)
        })
        .catch(err => res.json({ msg: "failed", error: err }))
};
