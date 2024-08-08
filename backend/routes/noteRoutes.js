const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getNotes,
  addNote,
  updateNote,
  uploadNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");
let cors = require("cors");
router
  .use(cors())
  .route("/")
  .get(protect, getNotes)
  .post(protect, addNote)
  .put(updateNote);

router.use(cors()).route("/:id").put(updateNote);

module.exports = router;
