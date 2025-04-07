import React from "react";
import "./PopularMovies.css";


function PopularMovies({ title, movies }) {
  return (
    <div className="carousel">
      <h1 className="carousel-title">{title}</h1>
      <div className="full-width-section">
        <div className="movie-carousel">
          {mockMovies.map((movie, index) => (
            <div key={index} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularMovies;
