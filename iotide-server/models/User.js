const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Blog = require("./blog");
const Project = require("./project");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  role: { type: String, required: true, default: "user" },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
