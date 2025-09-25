import React from "react";
import { FaSearch, FaUser, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css"; // import the CSS

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
  <div className="navbar-logo" onClick={() => navigate("/")}>
    BlogHub
  </div>

  {/* Search removed from navbar */}

  <div className="navbar-right">
    <button className="navbar-button" onClick={() => navigate("/write")}>
      Write Blog <FaPlusCircle className="ml-1" />
    </button>
    <button className="navbar-button" onClick={() => navigate("/account")}> 
      <FaUser />
    </button>
    <button
      className="navbar-button navbar-button-primary"
      onClick={() => navigate("/login")}
    >
      Sign Up
    </button>
  </div>
</header>

  );
};

export default Navbar;
