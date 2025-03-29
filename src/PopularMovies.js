import React from "react";
import "./PopularMovies.css";

const mockMovies = [
    { title: "Inception", image: "/movies/inception.png" },
    { title: "Interstellar", image: "/movies/interstellar.png" },
    { title: "The Matrix", image: "/movies/matrix.png" },
    { title: "Parasite", image: "/movies/parasite.jpg" },
    { title: "Avengers", image: "/movies/avengers.jpg" },
    { title: "Batman: The Dark Knight", image: "/movies/batman.jpg" },
    { title: "Fight Club", image: "/movies/fightclub.png" },
    { title: "Pulp Fiction", image: "/movies/pulpfiction.jpg" },
    { title: "The Shawshank Redemption", image: "/movies/shawshank.jpg" },
    { title: "Forrest Gump", image: "/movies/forest.jpg" },
  ];
  

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
