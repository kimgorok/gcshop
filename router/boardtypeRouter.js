// 201935250 김현중

const express = require("express");
var router = express.Router();

var board = require("../lib/board");

router.get("/type/view", (req, res) => {
  board.view(req, res);
});

router.get("/view/:type_id/1", (req, res) => {
  board.view_board(req, res);
});

router.get("/detail/:board_id/1", (req, res) => {
  board.view_detail(req, res);
});

router.get("/update/:board_id/:type_id/1", (req, res) => {
  board.detail_update(req, res);
});

router.get("/type/view/u", (req, res) => {
  board.view_u(req, res);
});

router.get("/type/create", (req, res) => {
  board.create(req, res);
});

router.post("/type/create_process", (req, res) => {
  board.create_process(req, res);
});

router.get("/type/update/:type_id", (req, res) => {
  board.update(req, res);
});
router.post("/type/update_process", (req, res) => {
  board.update_process(req, res);
});
router.get("/type/delete/:type_id", (req, res) => {
  board.delete_process(req, res);
});

module.exports = router;
