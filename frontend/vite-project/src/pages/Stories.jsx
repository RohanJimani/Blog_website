import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const API_BASE = "http://localhost:5000/api/blogs"; // Backend API base

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Stories = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");
  const [likedIds, setLikedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]));
  }, []);

  const handleExpandClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Like a blog
  const handleLike = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Like failed");

      // Update local state
      setBlogs(prev =>
        prev.map(blog =>
          blog._id === id
            ? { ...blog, likes: blog.likes ? blog.likes + 1 : 1 }
            : blog
        )
      );
      setLikedIds(prev => prev.includes(id) ? prev : [...prev, id]);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Add comment
  const handleAddComment = async (id, commentText) => {
    if (!commentText) return;
    try {
      const res = await fetch(`${API_BASE}/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: commentText }),
      });
      if (!res.ok) throw new Error("Comment failed");

      const newComment = await res.json();
      setBlogs(prev =>
        prev.map(blog =>
          blog._id === id
            ? { ...blog, comments: [...(blog.comments || []), newComment] }
            : blog
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  // Filter blogs by search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      blog.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-6 text-left" style={{marginTop: "2%", marginBottom:"2%" ,  marginLeft:"40%"}}>Featured & Latest Stories</h2>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories..."
            style={{ width: "60%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
          />
        </div>
        {filteredBlogs.length === 0 ? (
          <p className="text-muted-foreground text-center">No stories found.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "flex-start" }}>
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                style={{ flex: "1 1 calc(33.333% - 2rem)", maxWidth: "345px", minWidth: "280px", cursor: "pointer" }}
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <Card sx={{ maxWidth: 345, margin: "auto" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }}>
                        {blog.title && blog.title[0] ? blog.title[0].toUpperCase() : "B"}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={blog.title}
                    subheader={blog.excerpt}
                  />
                  {blog.image ? (
                    <CardMedia component="img" height="194" image={blog.image} alt={blog.title} />
                  ) : (
                    <CardMedia component="div" sx={{ height: 194, backgroundColor: "#f3f4f6" }} />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">{blog.content}</Typography>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blog.tags?.map((tag, idx) => (
                        <span key={idx} className="badge px-2 py-1 rounded-full bg-blue-100 text-blue-700">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="like"
                      onClick={(e) => { e.stopPropagation(); handleLike(blog._id); }}
                    >
                      <FavoriteIcon sx={{ color: likedIds.includes(blog._id) ? "red" : undefined }} />
                      <span style={{ marginLeft: 4 }}>{blog.likes || 0}</span>
                    </IconButton>
                    <IconButton aria-label="comments" onClick={(e) => e.stopPropagation()}>
                      <CommentIcon />
                      <span style={{ marginLeft: 4 }}>{Array.isArray(blog.comments) ? blog.comments.length : 0}</span>
                    </IconButton>
                    <ExpandMore
                      expand={expandedId === blog._id}
                      onClick={(e) => { e.stopPropagation(); handleExpandClick(blog._id); }}
                      aria-expanded={expandedId === blog._id}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expandedId === blog._id} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{blog.content}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
