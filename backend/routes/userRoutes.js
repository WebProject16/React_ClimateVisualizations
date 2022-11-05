var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/hello",userController.hello);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;