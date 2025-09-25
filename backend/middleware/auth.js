// Middleware to check if user is authenticated and is the blog owner
const Blog = require('../models/Blog');

module.exports = async function checkBlogOwner(req, res, next) {
  const userId = req.body.userId || req.query.userId || req.headers['x-user-id'];
  const blogId = req.params.id;
  if (!userId) return res.status(401).json({ message: 'User not authenticated' });
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
