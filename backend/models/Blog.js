const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  tags: [String],
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: { type: [String], default: [] }
});

module.exports = mongoose.model('Blog', BlogSchema);
