const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	title: {type: String, required: true, unique: true},
	desc: {type: String, required: true},
	mainimg: {type: String},
	additionalimgs: {type: Array},
	categories: {type: Array},
	size: {type: String},
	color: {type: String},
	price: {type: String},
	isAdmin: {
		type: boolean,
		default: false,
	},
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
