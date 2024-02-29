const mongoose = require("mongoose");

const User = require("./user");
const Comment = require("./comment");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //this is a reference to the User model
  createdAt: { type: Date, default: Date.now, immutable: true },
  tags: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number },
  difficulty: String,
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
