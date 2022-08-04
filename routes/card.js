var express = require("express");
var router = express.Router();

const producerModel = require("../models/producers");
const productModel = require("../models/products");

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

router.ger("/product", async function (req, res, next) {
	const product_id = req.query.product_id;
	console.log("The id of this product is: ", product_id);
	const product = await productModel
		.findById(product_id)
		.populate("domain_adress");
	res.json({ product });
});

module.exports = router;
