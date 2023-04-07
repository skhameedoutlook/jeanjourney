const router = require("express").Router();
const cryptojs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require("../models/Order");


router.get("/testpath", (req, res) => {
	res.status(200).json("DONE");
})

router.post("/:userId", verifyTokenAndAuthorization, async (req, res) => {
	console.log("New order for " + req.params.userId);

	const newOrder = new Order(req.body);
	newOrder.userId = req.params.userId;
	
	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		console.log("Error in new order creation");
		res.status(500).json(err);
	} 
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	if(!req.body.status) {
		res.status(500).json("Nothing to update");
		return;
	}
	try {
		console.log("Updating order");
		const updatedCart = await Order.findByIdAndUpdate(req.params.id, {
			status: req.body.status 
		}, { new: true });
		console.log("Updated order");
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
})


router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.userId});
		res.status(200).json(orders);
	} catch(err) {
		res.status(500).json(err);
	}
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
