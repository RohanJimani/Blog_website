import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../assets/blogdetails.css";

const API_BASE = "http://localhost:5000/api/blogs";





const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched blog i:", data); 
        setBlog(data);
        setLikes(data.likes || 0);
        setComments(data.comments || []);
      })
      .catch(() => setBlog(null));
  }, [id]);

  if (!blog) {
    return (
      <div className="blog-details">
        <div className="blog-container">
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      navigate("/stories");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/blogs/${id}/like`, {
  //       method: "POST"
  //     });
  //     const updated = await res.json();
  //     setLikes(updated.likes || 0);
  //   } catch (err) {
  //     alert("Error liking blog");
  //   }
  // };

  // const handleAddComment = async () => {
  //   if (commentText.trim() !== "") {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/blogs/${id}/comment`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ comment: commentText })
  //       });
  //       const updated = await res.json();
  //       setComments(updated.comments || []);
  //       setCommentText("");
  //     } catch (err) {
  //       alert("Error adding comment");
  //     }
  //   }
  // };

  const handleLike = async () => {
  try {
    const res = await fetch(`${API_BASE}/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Like failed");
    const updated = await res.json();
    setLikes(updated.likes || 0);
  } catch (err) {
    console.error(err);
    alert("Error liking blog");
  }
};

const handleAddComment = async () => {
  if (!commentText.trim()) return;

  try {
    const res = await fetch(`${API_BASE}/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: commentText }),
    });
    if (!res.ok) throw new Error("Comment failed");
    const updated = await res.json();
    setComments(updated.comments || []);
    setCommentText("");
  } catch (err) {
    console.error(err);
    alert("Error adding comment");
  }
};


  return (
    <div className="blog-details">
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h1>{blog.title}</h1>
          <p className="date">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Image */}
        {blog.imageUrl ? (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="blog-image"
          />
        ) : (
          <div className="blog-image" />
        )}

        {/* Content */}
        <div className="blog-content">{blog.content}</div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-tags">
            {blog.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Like & Comment Section */}
        <div className="blog-interactions">
        <button
          onClick={handleLike}
          className="icon-btn"
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <FavoriteIcon fontSize="small" style={{ color: "red" }} />
          Like ({likes})
        </button>
      </div>



        <div className="blog-comments">
          <h3>
            <CommentIcon /> Comments ({comments.length})
          </h3>
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleAddComment} className="icon-btn">
              <CommentIcon fontSize="small" /> Add
            </button>
          </div>
          <div className="comment-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="comment-card">
                  <p>{c}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actions */}
        
          <div className="blog-actions">
              <button onClick={() => navigate(`/edit/${blog._id}`)}>
                <EditIcon fontSize="small" /> Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <DeleteIcon fontSize="small" /> Delete
              </button>
            
        </div>
        
        



      </div>
    </div>
  );
};

export default BlogDetails;
