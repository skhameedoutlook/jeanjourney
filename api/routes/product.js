const router = require("express").Router();
const cryptojs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");


router.get("/testpath", (req, res) => {
	res.status(200).json("DONE");
})

router.post("/", verifyTokenAndAdmin, async (req, res) => {
	console.log("New product ");
	const newProduct = new Product(req.body);

	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		console.log("Error in new product creation");
		res.status(500).json(err);
	} 
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
			$set: req.body
		}, { new: true });
		console.log("Updated product");
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
})


router.get("/find/:id", async (req, res) => {
	try {
		const product = await User.findById(req.params.id);
		res.status(200).json(product);
	} catch(err) {
		res.status(500).json(err);
	}
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Deleted product");
	} catch(err) {
		res.status(500).json(err);
	}
});

router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;
		
		if(qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if(qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});


module.exports = router;
