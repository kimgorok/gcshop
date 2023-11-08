// 201935250 김현중

const express = require("express");
var router = express.Router();

var person = require("../lib/person");

router.get("/view/v", (req, res) => {
  person.view(req, res);
});

router.get("/view/u", (req, res) => {
  person.view_u(req, res);
});

router.get("/create", (req, res) => {
  person.create(req, res);
});

router.post("/create_process", (req, res) => {
  person.create_process(req, res);
});

router.get("/update/:loginid", (req, res) => {
  person.update(req, res);
});
router.post("/update_process", (req, res) => {
  person.update_process(req, res);
});
router.get("/delete/:loginid", (req, res) => {
  person.delete_process(req, res);
});

module.exports = router;
