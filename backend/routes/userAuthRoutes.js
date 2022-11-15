const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController.js");

router.delete("/deleteUser", userController.deleteUser);
router.get("/token", userController.checkToken);

module.exports = router;