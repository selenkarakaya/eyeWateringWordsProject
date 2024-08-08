const mongoose = require("mongoose");

const avatarSchema = mongoose.Schema(
  {
    user: {
      type: String,
    },
    file: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Avatar", avatarSchema);
