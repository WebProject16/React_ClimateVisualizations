const express = require('express');
const router = express.Router();
const viewController = require("../controllers/viewController.js");

router.get("/:url", viewController.fetchViewByUrl);

module.exports = router;