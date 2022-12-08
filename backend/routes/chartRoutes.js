const express = require('express');
const router = express.Router();
const chartController = require("../controllers/chartController.js");

router.get("/v1", chartController.v1);
router.get("/v3", chartController.v3);
router.get("/v4", chartController.v4);
router.get("/v5", chartController.v5);
router.get("/v6", chartController.v6);
router.get("/v7", chartController.v7);
router.get("/v8", chartController.v8);
router.get("/v9", chartController.v9);

module.exports = router;