// 201935250 김현중

const express = require("express");
var router = express.Router();

var shop = require("../lib/shop");

router.get("/", (req, res) => {
  shop.home(req, res);
});

module.exports = router;
