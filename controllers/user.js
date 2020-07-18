const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken
const dotenv = require("dotenv");

// get config vars
dotenv.config();
const User = require("../models/user"); //importing the models

exports.signup = (req, res, next) => {
	const {firstname, email, username, password } = req.body;
		if (!firstname || !email || !username  || !password) {
	  res.status(400).json({ msg: "All Fields are required" })
		} else {
	  User.findOne({
		where: {
		 email
		}
	  })
	  .then(emailExist => {
		if(emailExist){
		}else{
			let hashedPassword;
                try{
                    const salt = bcrypt.genSaltSync(10);
                    hashedPassword = bcrypt.hashSync(password, salt);
                }catch(error){
                    throw error;
				}
				User.create({
					firstname, email, username, password: hashedPassword
				})
				.then(user => {
					jwt.sign(
                        { id: user.id },process.env.AUTH_SECRET_KEY,
                        { expiresIn: "5h"}, (err,token) => {
                            return res.status(200).json({
                                token,
                                user
						})
					})
				})
				.catch(err => res.json({ msg: err.message || "Not created"}))
		}
	  })
	  .catch((err) => {
			res.status(500).json({ msg: "error occured", err })
		})
	}
}
exports.login = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ msg: "All Field are required" });
	}
	else {
		User.findOne({
			where: { email },
			include: [{
				all: true
			}]
		})
			.then(user => {
				if (!user) {
					return res.status(400).json({ msg: "Invalid Email" });
				}
				bcrypt
					.compare(password, user.password)
					.then(match => {
						if (!match) {
							return res.status(400).json({ msg: "Invalid Password" });
						}
						jwt.sign(
							{ userId: user.id },
							process.env.AUTH_SECRET_KEY,
							{ expiresIn: "1h" },
							(err, token) => {
								res.status(200).json({
									token,
									user,msg:"Success"
								});
							}
						);
					})
					.catch(err => res.json({ msg: "failed", error: err }))
			})
			.catch(err => res.json({ msg: "failed", error: err }))
	}
};

exports.getAllUser = (req, res, next) => {
	User.findAll()
		.then((users) => {
			res.json(users)
		})
		.catch(err => res.json({ msg: "failed", error: err }))
};
