const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false, // OAuth users may not always provide a name
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        // Only required for users who registered manually
        return !this.provider || this.provider === "credentials";
      },
    },
    // birthday: {
    //   type: Date,
    //   required: false, // optional for OAuth users
    // },
    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook", "github"],
      default: "credentials",
    },
    firebaseUid: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
