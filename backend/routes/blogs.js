// const express = require('express');
// const router = express.Router();
// const Blog = require('../models/Blog');
// const checkBlogOwner = require('../middleware/auth');

// // Create blog post
// router.post('/', async (req, res) => {
//   try {
//     const { title, excerpt, content, tags, image, author } = req.body;
//     const blog = new Blog({ title, excerpt, content, tags, image, author });
//     await blog.save();
//     res.status(201).json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all blog posts
// router.get('/', async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate('author', 'email');
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Increment likes for a blog
// router.post('/:id/like', async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { likes: 1 } },
//       { new: true }
//     );
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a comment to a blog
// router.post('/:id/comment', async (req, res) => {
//   try {
//     const { comment } = req.body;
//     const blog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { $push: { comments: comment } },
//       { new: true }
//     );
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get single blog post
// router.get('/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate('author', 'email');
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Edit blog post
// router.put('/:id', checkBlogOwner, async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete blog post
// router.delete('/:id', checkBlogOwner, async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json({ message: 'Blog deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get all blogs for a specific user
// router.get('/user/:id', async (req, res) => {
//   try {
//     const blogs = await Blog.find({ author: req.params.id });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
