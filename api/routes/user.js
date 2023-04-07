const router = require("express").Router();
const cryptojs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const User = require("../models/User");

router.get("/testpath", (req, res) => {
	res.status(200).json("DONE");
})

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

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch(err) {
		res.status(500).json(err);
	}
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
	const query = req.query.new
	try {
		const users = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
	
	try {
		count = await User.estimatedDocumentCount();
		res.status(200).json({ "count": count });
	} catch(err) {
		res.status(500).json(err);
	}
});

module.exports = router;
