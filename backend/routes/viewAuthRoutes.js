const express = require('express');
const router = express.Router();
const viewController = require("../controllers/viewController.js");

router.get("/users/all", viewController.fetchUsersViews);
router.post("/", viewController.createView);
router.delete("/:url", viewController.deleteView);

module.exports = router;