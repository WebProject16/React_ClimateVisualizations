const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/hello", userController.hello);

module.exports = router;