const router = require("express").Router();
const cryptojs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");


router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	if(req.body.password) {
		req.body.password = cryptojs.SHA3(req.body.password).toString();
	}
	console.log(":id here");
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, {
			$set: req.body
		}, { new: true });
		console.log("Updated user");
		res.status(200).json(updatedUser);
	} catch(err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User deleted");
	} catch(err) {
		res.status(500).json(err);
	}
});

module.exports = router;
