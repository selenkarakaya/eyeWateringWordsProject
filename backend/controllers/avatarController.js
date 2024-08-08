const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Avatar = require("../models/avatarModel");
const path = require("path");

const addImage = async (req, res) => {
  const { filename } = req.file;

  if (!filename) {
    res.status(400);
    throw new Error("Please fill the fields");
  }
  // Get user using id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  try {
    const avatarData = new Avatar({ user: req.user.id, file: filename });
    const avatar = await avatarData.save();
    res.status(201).json({ status: 201, avatar });
    // const newImage = await Avatar.create(body);
    // newImage.save();
    // res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAvatar = asyncHandler(async (req, res) => {
  const avatar = await Avatar.find();
  res.status(200).json(avatar);
});
module.exports = { addImage, getAvatar };
