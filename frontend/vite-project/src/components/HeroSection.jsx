import React from "react";
import Navbar from "./navbar"; // Your navbar
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <main className="hero-section flex-1">
        <div className="background-pattern"></div>
        <div className="container">
          <div className="badge">
            <FaChartLine className="h-4 w-4 mr-2" />
            Join thousands of writers sharing their stories
          </div>

          <h1>
            Share Your Story <br />
            <span>With the World</span>
          </h1>

          <p>
            Discover amazing stories, thinking, and expertise from writers on any topic.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/write")}>
              Start Writing <FaArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/stories")}
            >
              Explore Stories
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
