const asyncHandler = require("express-async-handler");
const path = require("path");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const note = await Note.create({
    text: req.body.text,
    // photo: req.file.file,
    // photo: `${req.protocol}://${req.get("host")}/images${req.file.filename}`,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(req.params.noteId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
});
// @desc    upload ticket note
// @route   PuT /api/tickets/:ticketId/notes/photo
// @access  Private
const uploadNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  // if (!user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }
  const note = await Note.findById(req.params.noteId);
  // if (note.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }
  if (!req.files) {
    console.log("image yok");
    throw new Error("file yok");
  }

  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    console.log("image degil");
    throw new Error("image degil");
  }

  if (file.size > 1000000) {
    console.log("image butyuk");
    throw new Error("image butuj");
  }
  file.name = `photo_${req.params.noteId}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      console.log("yuklmede problem var");
    }

    await Note.findOneAndUpdate(req.params.noteId, { photo: file.name });

    res.status(200).json({ success: true, data: file.name });
  });
});

module.exports = {
  getNotes,
  addNote,
  uploadNote,
  updateNote,
};
