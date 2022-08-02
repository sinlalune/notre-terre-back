var express = require("express");
var router = express.Router();
//Uniq ID
var uniqid = require("uniqid");
const productModel = require("../models/products");
const { findById } = require("../models/users");

//Set-Up Cloudinary
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "CHANGE CLOUD NAME",
  api_key: "CHANGE API KEY",
  api_secret: "CHANGE API SECRET",
});

/* GET home page. */
router.get("/product", async function (req, res, next) {
  const product = await productModel.find();
  res.json({ product });
});

module.exports = router;
