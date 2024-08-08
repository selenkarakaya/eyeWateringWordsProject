const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getEntrys,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
} = require("../controllers/entryController");

const commentRouter = require("./commentRoutes");
router.use("/:entryId/comments", commentRouter);

router.route("/").get(protect, getEntrys).post(protect, createEntry);
router
  .route("/:id")
  .get(getEntry)
  .delete(protect, deleteEntry)
  .put(protect, updateEntry);

module.exports = router;
