const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
let cors = require("cors");

router.use(cors()).route("/").get(getComments).post(protect, addComment);

router.route("/:id").delete(protect, deleteComment);
module.exports = router;
