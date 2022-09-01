var mongoose = require("mongoose");

const producerSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  desc: String,
  pictures: [String],
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  type_delivery: String,
});

const producerModel = mongoose.model("producers", producerSchema);

module.exports = producerModel;
