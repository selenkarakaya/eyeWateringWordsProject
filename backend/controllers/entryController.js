const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Entry = require("../models/entryModel");

//@desc Get  all Entries
//@route GET /api/entries
//@access public
const getAllEntries = asyncHandler(async (req, res) => {
  const entrys = await Entry.find({});
  res.status(200).json(entrys);
});

//@desc Get  user Entry
//@route GET /api/entries
//@access public
const getEntrys = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const entrys = await Entry.find({ user: req.user.id });
  res.status(200).json(entrys);
});

//@desc Get  single entry
//@route GET /api/entries/:id
//@access public
const getEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  // check entry exists
  if (!entry) {
    res.status(401);
    throw new Error("Entry not found");
  }

  res.status(200).json(entry);
});

//@desc Create  new entry
//@route POST /api/entrys
//@access private
const createEntry = asyncHandler(async (req, res) => {
  const { tag, description, username } = req.body;

  if (!tag || !description) {
    res.status(400);
    throw new Error("Please fill the fields");
  }

  // Get user using id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const entry = await Entry.create({
    tag,
    description,
    username,
    user: req.user.id,
  });
  res.status(200).json(entry);
});

//@desc Delete  user entry
//@route Delete /api/entrys/:id
//@access private
const deleteEntry = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const entry = await Entry.findById(req.params.id);
  // check entry exists
  if (!entry) {
    res.status(401);
    throw new Error("Entry not found");
  }
  // check user's id and entry's user id are same
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await entry.deleteOne();

  res.status(200).json({ success: true });
});

//@desc Update  user entry
//@route PUT /api/entrys/:id
//@access private
const updateEntry = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const entry = await Entry.findById(req.params.id);
  // check entry exists
  if (!entry) {
    res.status(401);
    throw new Error("Entry not found");
  }
  // check user's id and entry's user id are same
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(entry);
});

module.exports = {
  getEntrys,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
  getAllEntries,
};
