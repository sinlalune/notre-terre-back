var mongoose = require("mongoose");

const badgeSchema = mongoose.Schema({
  text: String,
  image: String,
});

const badgeModel = mongoose.model("badges", badgeSchema);

module.exports = { badgeModel };
