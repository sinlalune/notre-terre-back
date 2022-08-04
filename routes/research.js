var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
	const product = await productModel.find();
	res.json({ product });
});
/*
  router.get("/", async function (req, res, next) {
    console.log("req", req.query.producer_id);
    const producer_id = req.query.producer_id;
    console.log("id", producer_id);
    const producer = await producerModel.findById(producer_id.toString());
    console.log("producer", producer);
    res.json({ producer });
  });
*/

module.exports = router;
