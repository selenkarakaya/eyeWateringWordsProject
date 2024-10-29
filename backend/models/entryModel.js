const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the entry"],
    },
    tag: {
      type: String,
      required: [true, "Please enter a tag of your entry"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
