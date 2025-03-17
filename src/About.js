import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-us-text-center">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          MovieHub is a platform that helps you discover new movies and series based on your interests. You can keep track of your favorite movies, mark what you've watched, and rate your favorites.
        </p>
      </div>


      {/* Section 1 - Image Left, Text Right */}
      <div className="about-section">
        <img src="movie-watching.jpg" alt="Movie Experience" className="about-image" />
        <div className="about-text-container">
          <h2 className="about-title">Discover New Movies</h2>
          <p className="about-text">
            MovieHub helps you explore trending movies and series based on your interests.
          </p>
        </div>
      </div>

      {/* Section 2 - Text Left, Image Right */}
      <div className="about-section reverse">
        <div className="about-text-container">
          <h2 className="about-title">Track What You Watch</h2>
          <p className="about-text">
            Keep track of your favorite movies, mark what you've watched, and rate your favorites.
          </p>
        </div>
        <img src="movie-tracking.jpg" alt="Tracking Movies" className="about-image" />
      </div>
    </div>
  );
}

export default About;
