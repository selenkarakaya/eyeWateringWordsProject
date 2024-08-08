const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    entry: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Entry",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
