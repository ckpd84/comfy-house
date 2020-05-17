var express = require("express");
var router = express.Router();
var mainController = require("../controller/mainController.js");

/* GET home page. */
router.get("/", mainController.index);

module.exports = router;
