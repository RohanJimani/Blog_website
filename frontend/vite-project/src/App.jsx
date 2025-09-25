import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePages";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stories from "./pages/Stories";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import Account from "./pages/Account";
import { RequireAuth } from "./components/RequireAuth";

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) {
    alert("Please login to access this page.");
    window.location.href = "/login";
    return null;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/write" element={<RequireAuth><CreateBlog /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories" element={<RequireAuth><Stories /></RequireAuth>} />
        <Route path="/blog/:id" element={<RequireAuth><BlogDetails /></RequireAuth>} />
        <Route path="/edit/:id" element={<RequireAuth><EditBlog /></RequireAuth>} />
        <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
        {/* Later you can add more pages */}
        {/* <Route path="/signup" element={<SignUpPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
