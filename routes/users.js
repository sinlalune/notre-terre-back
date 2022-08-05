var express = require("express");
var router = express.Router();
//Uniq ID
var uniqid = require("uniqid");
const productModel = require("../models/products");
const { findById } = require("../models/users");

// Import of User Model
var userModel = require("../models/users");
var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var uniqid = require("uniqid");

// Import of User Model
var userModel = require("../models/users");

//Set-Up Cloudinary
var cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "CHANGE CLOUD NAME",
	api_key: "CHANGE API KEY",
	api_secret: "CHANGE API SECRET",
});

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

/* POST user to database. */
router.post("/sign-up", async function (req, res, next) {
	console.log(req.body);

	const cost = 10;
	const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

	var error = [];
	var result = false;
	var saveUser = null;

	const data = await userModel.findOne({
		email: req.body.emailFromFront,
	});

	if (data) {
		error.push(
			"❌ Utilisateur déjà enregistré, veuillez saisir une autre adresse email ❌",
		);
	}

	if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
		error.push("❌ Ooops, j'ai besoin de plus d'informations ❌");
	}

	if (error.length == 0) {
		var newUser = new userModel({
			email: req.body.emailFromFront,
			password: hash,
			token: uid2(32),
			avatar:
				"https://res.cloudinary.com/matthieudev/image/upload/v1659625192/generic-avatar_mpp1wf.png",
		});

		saveUser = await newUser.save();

		if (saveUser) {
			result = true;
			token = saveUser.token;
			saveUser = {
				avatar: saveUser.avatar,
				email: saveUser.email,
				token: saveUser.token,
			};
		}
	}

	res.json({ result, searchUser: saveUser, error });
});

// POST existing user
router.post("/sign-in", async function (req, res, next) {
	console.log(req.body);
	var error = [];
	var result = false;
	var searchUser = null;

	if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
		error.push("❌ Ooops, j'ai besoin de plus d'informations ❌");
	}

	if (error.length == 0) {
		var searchUser = await userModel.findOne({
			email: req.body.emailFromFront,
		});
		console.log(searchUser);
	}

	if (searchUser) {
		if (bcrypt.compareSync(req.body.passwordFromFront, searchUser.password)) {
			searchUser = {
				avatar: searchUser.avatar,
				email: searchUser.email,
				token: searchUser.token,
			};
			result = true;
		} else {
			result = false;
			searchUser = null;
			error.push("❌ Email ou mot de passe incorrect ❌");
		}
	} else {
		error.push("❌ Email ou mot de passe incorrect ❌");
	}

	res.json({ result, searchUser, error });
});

module.exports = router;
