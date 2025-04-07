import React from "react";
import "./LandingPage.css";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Background Image */}
      <div className="landing-background"></div>

      {/* Content */}
      <div className="landing-content">
        <h1 className="landing-title">Welcome to MovieHub</h1>
        <p className="landing-text">
          Track, review, and discover movies and series tailored to your preferences.
        </p>
        <button className="landing-button">Get Started</button>
      </div>

      {/* Popular Movies Carousel */}
      <div className="popular-movies-section">
        <PopularMovies title="Trending Now" />
      </div>
    </div>
  );
};

export default LandingPage;
