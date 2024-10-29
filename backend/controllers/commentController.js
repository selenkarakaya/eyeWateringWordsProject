const asyncHandler = require("express-async-handler");
const path = require("path");

const User = require("../models/userModel");
const Entry = require("../models/entryModel");
const Comment = require("../models/commentModel");

// @desc    Get comments for a entry
// @route   GET /api/entries/:entryId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.entryId);
  const comments = await Comment.find({ entry: req.params.entryId });
  res.status(200).json(comments);
});

// @desc    Create entry comment
// @route   POST /api/entries/:entryId/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const entry = await Entry.findById(req.params.entryId);
  // if (entry.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  const comment = await Comment.create({
    text: req.body.text,
    entry: req.params.entryId,
    commentUsername: user.username,
    user: req.user.id,
  });
  res.status(200).json(comment);
});

//@desc Delete  user comment
//@route Delete /api/entrys/:id/comments/:commentid
//@access private
const deleteComment = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const comment = await Comment.findById(req.params.id);
  // check entry exists
  if (!comment) {
    res.status(401);
    throw new Error("Comment not found");
  }
  // check user's id and entry's user id are same
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await comment.deleteOne();

  res.status(200).json({ success: true });
});

//@desc Update  user comment
//@route PUT /api/entrys/:id/comments/:commentid
//@access private
const updateComment = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const comment = await Comment.findById(req.params.id);
  // checkcomment exists
  if (!comment) {
    res.status(401);
    throw new Error("comment not found");
  }

  // check user's id and entry's user id are same
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizedd");
  }

  // entry.tag = req.body.tag;
  // entry.description = req.body.description;

  // const updatedEntry = await entry.save();
  // res.status(200).json({
  //   success: true,
  //   updatedEntry,
  // });
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedComment);
});

module.exports = {
  getComments,
  addComment,
  deleteComment,
  updateComment,
};
