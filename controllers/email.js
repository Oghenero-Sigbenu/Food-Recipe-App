const Email =  require("../models/email");

exports.postEmail = (req, res, next) => {
    const {email} = req.body;
    if(!email){
        res.json({ msg: "Email required" })
    }
    else{
        email.create({
            email
        })
        .then(email => {
            res.json(email)
        })
        .catch(err => res.json({ msg: err.message || "failed to create" }))
    }
}