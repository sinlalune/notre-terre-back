var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  type: String,
  name: String,
  icon_type: String,
  species_name: String,
  label: String,
  icon_label: String,
  producer: { type: mongoose.Schema.Types.ObjectId, ref: "producers" },
  domain_name: String,
  domain_adress: String,
  dedicated_quantitity: Number,
  stock_by_unity: Number,
  kilo_price: Number,
  max_sponsor_stock: Number,
  date_semance: Date,
  date_harvest: Date,
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
