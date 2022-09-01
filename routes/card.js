var express = require("express");
var router = express.Router();
const productModel = require("../models/products");

const producerModel = require("../models/producers");
const userModel = require("../models/users");
const orderModel = require("../models/users");

router.get("/productlist", async function (req, res, next) {
  const product = await productModel.find();
  res.json({ product });
});

router.get("/producer", async function (req, res, next) {
  console.log("req", req.query.producer_id);
  const producer_id = req.query.producer_id;
  console.log("id", producer_id);
  const producer = await producerModel.findById(producer_id.toString());
  console.log("producer", producer);
  res.json({ producer });
});

router.get("/product", async function (req, res, next) {
  const product_id = req.query.product_id;
  console.log("The id of this product is: ", product_id);
  const product = await productModel
    .findById(product_id)
    .populate("domain_adress")
    .populate("producer");
  res.json({ product });
});

router.get("/orders", async function (req, res, next) {
  const user_id = req.query.user_id;
  console.log("The id of this user is: ", user_id);
  const user_orders = await userModel
    .findById(user_id)
    .populate("orders")
    .populate("orders.product")


  res.json({ orders });

});
module.exports = router;
