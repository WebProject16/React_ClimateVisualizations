const express = require('express');
const router = express.Router();
const viewController = require("../controllers/viewController.js");

router.post("/create", viewController.createView);
router.delete("/delete/:url", viewController.deleteView);

module.exports = router;