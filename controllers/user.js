const bcrypt = require('bcryptjs');  //importing bcryptjs
const jwt = require("jsonwebtoken"); //importing jsonwebtoken

const User = require("../models/user"); //importing the models

// //user signUp 
// exports.addUser = (req, res, next) => {
// 	const { firstname, email,
// 		username, password } = req.body;
// 	console.log("love");
// 	// if either of the fields are empty render status(404)
// 	// else find a user by the email
// 	if (!firstname || !email || !username || !password) {
// 		res.status(400).json("All fields are required")
// 	}
// 	//search if the email already exist
// 	User.findOne({
// 		where: {
// 			email
// 		}
// 	})
// 		.then(user => {
// 			if (user) {
// 				return res.status(400).json({ msg: error.message || "User already exists" });
// 			}
// 			else {

// 				//pasword is hashed
// 				let hashedPassword;
// 				try {
// 					const salt = bcrypt.genSaltSync(10);
// 					hashedPassword = bcrypt.hashSync(password, salt);
// 				} catch (error) {
// 					throw error;
// 				}
// 				//user is created
// 				User.create({
// 					firstname, email,
// 					username, password: hashedPassword,
// 				})

// 					.then(user => {
// 						//logins in the user and assigns a token
// 						// const token = 
// 						jwt.sign(
// 							{ id: user.id }, process.env.AUTH_SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
// 								return res.json({
// 									token,
// 									user
// 								});

// 							});
// 						// const authenticatedUser = {
// 						//     id: user.id,
// 						//     firstname: user.firstname,
// 						//     lastname: user.lastname,
// 						//     email: user.email,
// 						//     username: user.username
// 						//     } 
// 					})
// 					.catch(err => res.json({ msg: err.message || "no" }))

// 			}
// 		})
// 		.catch(err => res.json({ msg: err.message || "failed to create account" }))

// };

exports.addUser = (req, res, next) => {
	const { firstname, email, username, password } = req.body;
  
	if (!firstname || !email || !username  || !password) {
	  res.status(400).json({ msg: "All Fields are required" })
	} else {
		console.log(email)
	  User.findAll({
		where: {
		  username
		}
	  })
		.then((userUsername) => {
		  if (userUsername.length > 0) {
			return res.status(400).json({ msg: "Username already exists", data: userUsername })
		  } else {
			User.findAll({
			  where: {
				email
			  }
			})
			  .then((userEmail) => {
				if (userEmail.length > 0) {
				  return res.status(400).json({ msg: "Email already exists", data: userEmail })
				} else {
				  let hashedPassword;
				  try {
					const salt = bcrypt.genSaltSync(10);
					hashedPassword = bcrypt.hashSync(password, salt);
				  } catch (error) {
					throw error;
				  }
				  User.create({
					firstname ,
					email,
					password: hashedPassword,
					username,
				  })
					.then((user) => {
					  jwt.sign(
						{ userId: user.id },
						process.env.AUTH_SECRET_KEY,
						{ expiresIn: "1h" },
						(err, token) => {
						  welcomeMail(req, res, next);
						  res.json({
							token,
							user
						  })
						})
					})
					.catch((err) => {
					  res.status(500).json({ msg: "error occured", err })
					})
				}
			  }).catch((err) => {
				res.status(500).json({ msg: err })
  
			  })
		  }
		})
		.catch((err) => {
		  res.status(500).json({ msg: err })
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
								res.json({
									token,
									user
								});
							}
						);
					})
					.catch(err => {
						next(err);
					});
			})
			.catch(err => next(err));
	}
};

exports.getAllUser = (req, res, next) => {
	User.findAll()
		.then((users) => {
			res.json(users)
		})
		.catch(err => res.json({ msg: "failed", error: err }))
};
