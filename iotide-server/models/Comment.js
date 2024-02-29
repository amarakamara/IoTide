const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  targetType: {
    type: String,
    enum: ["blog", "project"],
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
