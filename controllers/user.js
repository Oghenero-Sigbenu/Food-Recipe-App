const User = require("../models/user"); //importing the models


exports.postAddUser = (req, res, next) => {
    const {firstname, lastname, email, 
            username, password, imageUrl } = req.body;
            //if either of the fields are empty render status(404)
            // else find a user by the email
            if(!firstname || !lastname || !email || !username || !password){
                res.status(400).json("All fields are required")
            }else{
                // User.FindOne({
                //     Where({
                //         email
                //     })
                //     })
                //     .then(result => {
                        User.create({
                            firstname, lastname, email, 
                            username, password, imageUrl     
                            })
                            .then(result => {
                                res.json(result)
                            })
                             .catch(err => res.json({msg: "failed", error : err}))
}};

exports.getAllUser = (req, res, next) => {
    User.findAll()
        .then((users) => {
            res.json(users)
            })
            .catch(err => res.json({msg: "failed", error : err}))
            };