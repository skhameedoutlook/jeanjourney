const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	userId: { type: String, required: true},
	products: [{
		productId: { type: String, required: true },
		quantity: { type: Number, required: true, default: 1 },
		price: {type: Number, required: true}
		discount: {type: Number, default: 0},
	}],
	address: { type: String, required: true },
	status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
