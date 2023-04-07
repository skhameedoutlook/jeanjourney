const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	userId: { type: String, required: true},
	products: [{
		productId: { type: String },
		quantity: { type: Number, default: 1 },
	}],
	amount: { type: Number, required: true },
	address: [
		lineOne: { type: String, required: true },
		lineTwo: { type: String, required: false },
		state: { type: String, required: true },
		country: { type: String, required: true, default: "India" },
		pincode: { type: String, required: true },
	],
	status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
