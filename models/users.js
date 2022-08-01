var mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  type: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: Number,
  amount: Number,
  current_state: String,
  type_delivery: String,
});

const adressSchema = mongoose.Schema({
  number: Number,
  street: String,
  city: String,
  zipcode: String,
});

const userSchema = mongoose.Schema({
  token: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  gender: String,
  family_quantity: String,
  preference: String,
  avatar: String,
  preference: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  adresses: [adressSchema],
  orders: [orderSchema],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
