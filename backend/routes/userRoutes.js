const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.route("/:id").put(protect, updateUser).get(getUser);
router.post("/login", loginUser);
module.exports = router;
