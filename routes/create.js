var express = require("express");
var router = express.Router();
const userModel = require("../models/users");

router.post("/createuser", async function (req, res, next) {
  const addUser = new userModel();

  res.render("index", { title: "Express" });
});
