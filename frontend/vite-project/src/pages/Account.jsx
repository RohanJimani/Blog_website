import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaBirthdayCake, FaUser } from "react-icons/fa";
import "../assets/account.css";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (!storedUser || !storedUser._id) {
  //     setLoading(false);
  //     setUser(null);
  //     return;
  //   }

  //   // Fetch user details
  //   fetch(`http://localhost:5000/api/user/${storedUser._id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setUser(data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setUser(null);
  //       setLoading(false);
  //     });

  //   // Fetch user's blogs
  //   fetch(`http://localhost:5000/api/blogs/user/${storedUser._id}`)
  //     .then(res => res.json())
  //     .then(data => setBlogs(data))
  //     .catch(() => setBlogs([]));
  // }, []);

  useEffect(() => {
  const fetchData = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser._id) {
      setLoading(false);
      return;
    }

    try {
      // Fetch user info
      const userRes = await fetch(`http://localhost:5000/api/user/${storedUser._id}`);
      const userData = await userRes.json();
      setUser(userData);

      // Fetch blogs for this user
      const blogsRes = await fetch(`http://localhost:5000/api/blogs/user/${storedUser._id}`);
      const blogsData = await blogsRes.json();
      console.log("Fetched user blogs:", blogsData); // DEBUG
      setBlogs(blogsData);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  


  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("User is logged out.");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="account-container">
        <div className="account-card">
          <h2>Account</h2>
          <p>Loading account details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="account-container">
        <div className="account-card">
          <h2>Account</h2>
          <p>You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>Author Profile</h2>

        {/* Profile */}
        <div className="profile-section">
          <div className="profile-avatar">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" style={{ width: 64, height: 64, borderRadius: '50%' }} />
            ) : (
              <span style={{ fontSize: 32 }}>{user.firstName ? user.firstName[0] : "A"}</span>
            )}
          </div>
          <div className="profile-name">
            {user.firstName} {user.lastName}
          </div>
          <div className="profile-bio">
            {user.bio ? user.bio : "No bio added yet."}
          </div>
        </div>

        {/* First Name & Last Name */}
        <div className="info-section">
          <FaUser className="icon" />
          <div>
            <div className="info-label">Name:</div>
            <div className="info-value">{user.firstName} {user.lastName}</div>
          </div>
        </div>

        {/* Email */}
        <div className="info-section">
          <FaEnvelope className="icon" />
          <div>
            <div className="info-label">Email:</div>
            <div className="info-value">{user.email}</div>
          </div>
        </div>

        {/* DOB */}
        <div className="info-section">
          <FaBirthdayCake className="icon" />
          <div>
            <div className="info-label">Date of Birth:</div>
            <div className="info-value">{user.dateOfBirth}</div>
          </div>
        </div>

        <button className="btn-danger" style={{ marginTop: '1rem' }} onClick={handleLogout}>
          Log Out
        </button>

        {/* Blogs */}
        <div className="blog-section">
          <h3>Your Blog Posts</h3>
          {blogs.length === 0 ? (
            <div className="info-value">You have not written any blogs yet.</div>
          ) : (
            <ul className="blog-list">
              {blogs.map(blog => (
                <li key={blog._id} className="blog-item">
                  <div className="blog-item-title">{blog.title}</div>
                  <div className="blog-item-excerpt">{blog.excerpt}</div>
                  <div className="blog-item-date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
