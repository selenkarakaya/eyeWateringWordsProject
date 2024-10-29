const express = require("express");
const router = express.Router();

const {
  getAllEntries,
  searchEntry,
} = require("../controllers/entryController");

router.route("/").get(getAllEntries);

router.route("/search/:key").get(searchEntry);

module.exports = router;
