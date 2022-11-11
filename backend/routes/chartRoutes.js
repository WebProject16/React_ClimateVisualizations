const express = require('express');
const router = express.Router();
const chartController = require("../controllers/chartController.js");

router.get("/v1", chartController.v1);

module.exports = router;