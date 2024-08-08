const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAllEntries } = require("../controllers/entryController");

router.route("/").get(getAllEntries);

module.exports = router;
