const Email = require("../models/email");

exports.postEmail = (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		res.status(400).json({ msg: "All field required" })
	}else{
		Email.findOne({
			where:{
				email	
			}
		})
		.then(emailD => {
			if(!emailD){
				Email.create({
					email
				})
				.then(emailC => {
					res.status(201).json({ msg: "Email added to mailing list successfully" })
				})
				.catch(err => res.status(401).json({ msg: err.message || "failed to create" }))
			}else{
				res.status(401).json({  msg:err.message || "Email already exist" })
			}
		})
		.catch(err => res.status(401).json({ msg: err.message || "failed to create" }))
}};