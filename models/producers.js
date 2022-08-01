var mongoose = require("mongoose");

const producerSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  pictures: [String],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  icon_badges: String,
  type_delivery: String,
});

const producerModel = mongoose.model("producers", producerchema);

module.exports = { producerModel };
