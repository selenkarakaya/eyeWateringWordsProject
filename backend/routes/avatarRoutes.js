const express = require("express");
const router = express.Router();
const upload = require("../middleware/imageMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { addImage, getAvatar } = require("../controllers/avatarController");

// router.post("/", addImage);
router
  .route("/")
  .get(getAvatar)
  .post(protect, upload.single("photo"), addImage);
module.exports = router;
