const Email = require("../models/email");

exports.postEmail = (req, res, next) => {
	const { email } = req.body;
	if (!email) {
		res.json({ msg: "Email required" })
	}
	Email.create({
		email
	})
		.then(email => {
			res.status(201).json({ data: email, msg: "Email added to mailing list successfully" })
		})
		.catch(err => res.status(401).json({ msg: err.message || "failed to create" }))
};