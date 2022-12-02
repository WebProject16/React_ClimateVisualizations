const express = require('express');
const router = express.Router();
const viewController = require("../controllers/viewController.js");

router.get("/all", viewController.fetchUsersViews);
router.post("/", viewController.createView);
router.get("/:url", viewController.fetchViewByUrl);
router.delete("/:url", viewController.deleteView);

module.exports = router;