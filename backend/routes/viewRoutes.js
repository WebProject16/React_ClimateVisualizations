const express = require('express');
const router = express.Router();
const viewController = require("../controllers/viewController.js");

router.post("/create", viewController.create);

module.exports = router;