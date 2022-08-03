var express = require("express");
var router = express.Router();
const productModel = require("../models/products");


/* GET home page. */
router.get("/product", async function (req, res, next) {
  const product = await productModel.find();
  res.json({ product });
});
 // Final 
module.exports = router;
