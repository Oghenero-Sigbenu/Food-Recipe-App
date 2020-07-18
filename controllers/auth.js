const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken

const User = require("../models/user"); //importing the models

//user login
exports.login = (req, res, next) => {
    const {email,password} = req.body;
    //check for empty fields
    if(!email || !password) {
        return res.status(400).json({ msg: err.message || "All fields are required" })
    }
    //checks user is registered
    else{
        User.findOne({
            where:
            {email} 
        })
       
    .then(user => {
        if(!user){
            res.status(400).json({ msg: err.message || "User does not exist" });
        }
        else{
    bcrypt
        //checks is password matches user password
        .compare(password, user.password)
        .then(match => {
            //if it does not match
            if(!match) {
                return res.status(400).json({ msg: err.message || "Invalid Password" });
            }
        //login the user if it matches the password then assign a token
        jwt.sign({userId: user.id}, process.env.AUTH_SECRET_KEY, {expiresIn:"24h"}, (err, token) => {
           res.json({token, user})
           console.log(token, user)
        })
    })

    .catch(err => res.json({ msg: err.message || "failed to login" }))
    }
    
    })
    .catch(err => res.json({ msg: err.message || "failed to login" }))

}
}


exports.getCurrentUser = (req, res, next) => {
    const userId = req.userId;
    User.findOne({
      where: {
        id: userId
      },
      include: [{
        all: true
      }]
    })
      .then(user => {
        res.json(user);
      })
      .catch(error =>
        res
          .status(500)
          .json({ msg: "Something went wrong while fetching the user", error })
      );
  };