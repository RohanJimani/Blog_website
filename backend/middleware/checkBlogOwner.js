// middleware/checkBlogOwner.js

const Blog = require('../models/Blog');

// Middleware to check if the logged-in user is the owner of the blog
const checkBlogOwner = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Get userId from request body or headers
    const userId = req.body.userId || req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the logged-in user is the blog author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // User is the owner, allow next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkBlogOwner;
