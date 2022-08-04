var express = require("express");
var router = express.Router();
const userModel = require("../models/users");
const producerModel = require("../models/producers");
const productModel = require("../models/products");

router.post("/user", async function (req, res, next) {
  const addUser = new userModel({
    token: req.body.token,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    family_quantity: req.body.family_quantity,
  });

  const savedUser = await addUser.save();
  res.json({ savedUser });
});

router.post("/adress", async function (req, res, next) {
  const addAdress = await userModel.updateOne(
    { _id: req.body.id },
    {
      $push: {
        adresses: {
          number: req.body.number,
          street: req.body.street,
          city: req.body.city,
          zipcode: req.body.zipcode,
        },
      },
    }
  );
  const updatedUser = await userModel.findById(req.body.id);

  res.json({ updatedUser });
});

router.post("/order", async function (req, res, next) {
  const addorder = await userModel.updateOne(
    { _id: req.body.id },
    {
      $push: {
        orders: {
          type: req.body.type,
          product: req.body.product_id,
          quantity: req.body.quantity,
          amount: req.body.amount,
          current_state: req.body.state,
          type_delivery: req.body.type_delivery,
        },
      },
    }
  );
  const updatedUser = await userModel.findById(req.body.id);

  res.json({ updatedUser });
});

router.post("/producer", async function (req, res, next) {
  const addProducer = new producerModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    desc: req.body.desc,
    type_delivery: req.body.delivery,
  });

  const savedProducer = await addProducer.save();
  res.json({ savedProducer });
});

router.post("/product", async function (req, res, next) {
  const addProduct = new productModel({
    type: req.body.type,
    name: req.body.name,
    icon_type: req.body.icon,
    species_name: req.body.species_name,
    label: req.body.label,
    domain_name: req.body.domain_name,
    domain_adress: [{ lat: req.body.lat, lon: req.body.lon }],
    dedicated_quantitity: req.body.quantity,
    stock_by_unity: req.body.unity,
    kilo_price: req.body.kilo_price,
    max_sponsor_stock: req.body.max,
    date_semance: req.body.semance,
    date_harvest: req.body.harvest,
    producer: req.body.producer,
  });

  const savedProduct = await addProduct.save();
  res.json({ savedProduct });
});

router.post("/productadress", async function (req, res, next) {
  console.log("coord", req.body.lat, req.body.lon);

  const addorder = await productModel.updateOne(
    { _id: req.body.id },
    {
      $push: {
        domain_adress: {
          lat: req.body.lat,
          lon: req.body.lon,
        },
      },
    }
  );
  const updatedUser = await productModel.findById(req.body.id);

  res.json({ updatedUser });
});

module.exports = router;
