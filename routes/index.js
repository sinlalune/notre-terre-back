var express = require("express");
var router = express.Router();

//Connection to Mongoose
var mongoose = require("mongoose");

//Uniq ID
var uniqid = require("uniqid");

//Set-Up Cloudinary
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "CHANGE CLOUD NAME",
  api_key: "CHANGE API KEY",
  api_secret: "CHANGE API SECRET",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
