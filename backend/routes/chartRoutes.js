const express = require('express');
const router = express.Router();
const chartController = require("../controllers/chartController.js");
const chart = require('../models/chartModel.js');

router.get("/v1", chartController.v1);
router.get("/v3", chartController.v3);
router.get("/v4", chartController.v4);
router.get("/v5", chartController.v5);
router.get("/v6", chartController.v6);

module.exports = router;