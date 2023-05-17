const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    rank: { type: String, required: false },
    rating: { type: Number, required: false },
    qns: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { collection: "users", timestamps: true }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
