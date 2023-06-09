const router = require("express").Router();
const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	if(!req.body.username || !req.body.email || !req.body.password) {
		res.status(500).json({"msg": "Username or email not provided"});
		return;
	}
	console.log("P0> " + cryptojs.SHA3(req.body.password).toString());
	console.log("P1> " + cryptojs.SHA3(req.body.password).toString());
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: cryptojs.SHA3(req.body.password).toString(),
		isAdmin: req.body.isAdmin,
	});
	

	if(req.body.phone) {
		newUser.phone = req.body.phone;
	}

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch(err) {
		res.status(500).json(err + " could not register");
	}
});

router.post("/login", async (req, res) => {
	if(!req.body.email || !req.body.password) {
		res.status(500).json({"msg": "Missing login details"});
		return;
	} 

	try {
		const user = await User.findOne({ email: req.body.email });
		if(!user) {
			res.status(401).json("Login details are incorrect");
			return;
		}
		const hashedPassword = cryptojs.SHA3(req.body.password).toString();
		console.log("P2> " + req.body.password + " -> " + hashedPassword);
		console.log("P3Stored> " + user.password);
		if(user.password !== hashedPassword) {
			res.status(401).json("Wrong password");
			return;
		}

		const accessToken = jwt.sign({
			id: user._id, isAdmin: user.isAdmin	
		}, 
		process.env.JWT_SEC,
		{expiresIn: "3d"}
		);
		
		const { password, ...userVisibleDetails } = user._doc;

		res.status(200).json({...userVisibleDetails, accessToken});
	} catch(err) {
		res.status(500).json(err);
	}

});

module.exports = router;
