var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();

//Connection to Mongoose
var mongoose = require("mongoose");

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
mongoose.connect(
	"mongodb+srv://dev:LaCapsule@cluster0.jcdou.mongodb.net/sandbox? retryWrites=true&w=majority", //remplacer par lien de notre database
	options,
	function (err) {
		console.log(err);
	},
);

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
