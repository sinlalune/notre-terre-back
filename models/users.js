var mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	type: String,
	product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
	quantity: Number,
	amount: Number,
	current_state: String,
	type_delivery: String,
});

const addressSchema = mongoose.Schema({
	street: String,
	zipcode: String,
	city: String,
});

const userSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
	token: String,
	avatar: String,
	firstName: String,
	lastName: String,
	preference: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
	address: [addressSchema],
	orders: [orderSchema],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
