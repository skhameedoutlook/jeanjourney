const router = require("express").Router();
const cryptojs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart");


router.get("/testpath", (req, res) => {
	res.status(200).json("DONE");
})

router.post("/:userId", verifyTokenAndAuthorization, async (req, res) => {
	console.log("New cart for " + req.params.userId);

	const newCart = new Cart(req.body);
	newCart.userId = req.params.userId;
	
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		console.log("Error in new cart creation");
		res.status(500).json(err);
	} 
});

router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
	if(!req.body.products) {
		res.status(500).json("Nothing to update");
		return;
	}

	try {
		console.log("Updating cart");
		const updatedCart = await Cart.findOneAndUpdate({ userId: req.params.userId}, {
			products: req.body.products
		}, { new: true });
		console.log("Updated cart");
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
})


router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.userId});
		res.status(200).json(cart);
	} catch(err) {
		res.status(500).json(err);
	}
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json(carts);
	} catch (err) {
		res.status(500).json(err);
	}
});


module.exports = router;
