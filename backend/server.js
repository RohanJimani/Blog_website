const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
// const blogRoutes = require('./routes/blogs');
const BlogRoutes = require('./routes/blogRoutes');

require('dotenv').config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
// app.use('/api/blogs', blogRoutes);
app.use('/api/blogs', BlogRoutes);


// MongoDB connection using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
