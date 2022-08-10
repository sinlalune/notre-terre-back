var express = require("express");
var router = express.Router();
const productModel = require("../models/products");
const { findById } = require("../models/users");

const userModel = require("../models/users");

var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var fs = require("fs");
var uniqid = require("uniqid");
var cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: "dsmmqrr4r",
	api_key: "265735272248935",
	api_secret: "XR2iggtvixTB5Z3Ht0BcMQpGAJk",
});

var firstUpperCase = function (text) {
	text = text[0].toUpperCase() + text.slice(1).toLowerCase();
	console.log(text);
	return text;
};

var allLowerCase = function (text) {
	text = text.toLowerCase();
	console.log(text);
	return text;
};

var allUpperCase = function (text) {
	text = text.toUpperCase();
	console.log(text);
	return text;
};

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource");
});
/* POST user to database. */
router.post("/sign-up", async function (req, res, next) {
	console.log(req.body);

	var error = [];
	var result = false;
	var saveUser = null;
	var token = null;

	const searchUser = await userModel.findOne({
		email: allLowerCase(req.body.emailFromFront),
	});

	if (searchUser != null) {
		error.push(
			"❌ Utilisateur déjà enregistré, veuillez saisir une autre adresse email ❌",
		);
	}
	if (
		req.body.emailFromFront == "" ||
		req.body.passwordFromFront == "" ||
		req.body.firstNameFromFront == "" ||
		req.body.lastNameFromFront == "" ||
		req.body.addressFromFront == ""
	) {
		error.push("❌ Ooops, j'ai besoin de plus d'informations ❌");
	}

	if (error.length == 0) {
		const cost = 10;
		const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

		var newUser = new userModel({
			email: allLowerCase(req.body.emailFromFront),
			password: hash,
			token: uid2(32),
			avatar: "../assets/avatar.png",
			firstName: req.body.firstNameFromFront,
			lastName: req.body.lastNameFromFront,
			address: {
				street: req.body.streetFromFront,
				zipcode: req.body.zipcodeFromFront,
				city: req.body.cityFromFront,
			},
		});

		newUserSave = await newUser.save();

		if (newUserSave) {
			result = true;
			token = newUserSave.token;
			saveUser = {
				email: newUserSave.email,
				token: newUserSave.token,
				avatar: newUserSave.avatar,
				firstName: newUserSave.firstName,
				lastName: newUserSave.lastName,
				street: newUserSave.street,
				zipcode: newUserSave.zipcode,
				city: newUserSave.city,
			};
			res.json({ result, searchUser: newUserSave, error, token });
		}
	} else {
		res.json({ error });
	}
});

// POST existing user
router.post("/sign-in", async function (req, res, next) {
	console.log(req.body);

	var error = [];
	var result = false;
	var searchUser = null;
	var token = null;

	if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
		error.push("❌ Ooops, j'ai besoin de plus d'informations ❌");
	}

	if (error.length == 0) {
		var searchUser = await userModel.findOne({
			email: req.body.emailFromFront,
		});

		if (searchUser) {
			if (bcrypt.compareSync(req.body.passwordFromFront, searchUser.password)) {
				result = true;
				token = searchUser.token;
			} else {
				result = false;
				error.push("❌ Email ou mot de passe incorrect ❌");
			}
		} else {
			error.push("❌ Email ou mot de passe incorrect ❌");
		}

		res.json({ result, searchUser, error, token });
	}
});

router.post("/upload-snap", async function (req, res, next) {
	console.log("uploadsnap");
	console.log(req.files.photoTaken);
	console.log(req.files);
	console.log(req.files.photoTaken.name); // nom d'origine de l'image
	console.log(req.files.photoTaken.mimetype); // format de fichier
	console.log(req.files.photoTaken.data); // données brutes du fichier

	const pictureName = "./tmp/" + uniqid() + ".jpg";
	var resultCopy = await req.files.photoTaken.mv(pictureName);

	console.log("This is a picture to tmp :", resultCopy);

	if (!resultCloudinary) {
		var resultCloudinary = await cloudinary.uploader.upload(pictureName);

		console.log("This is a picture to Cloudinary :", resultCloudinary);

		res.json({
			result: true,
			message: "🤩 File uploaded ! 🤩",
			resultCloudinary,
		});
	} else {
		res.json({
			result: false,
			error: "❌ File not uploaded ! ❌",
			resultCloudinary,
		});
	}
	fs.unlinkSync(pictureName);
});

module.exports = router;
