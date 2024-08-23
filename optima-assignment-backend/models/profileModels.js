const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  userName: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Profile", profileSchema);
