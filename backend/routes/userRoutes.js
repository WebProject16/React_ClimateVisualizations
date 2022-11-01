var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/hello",userController.hello);

module.exports = router;