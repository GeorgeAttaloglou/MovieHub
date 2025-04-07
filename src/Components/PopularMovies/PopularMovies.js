import React, { useEffect, useState } from "react";
import "./PopularMovies.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; // replace with .env variable in production
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function PopularMovies({ title }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        const trimmed = data.results.map((movie) => ({
          title: movie.title,
          image: `${TMDB_IMAGE_BASE}${movie.poster_path}`,
        }));
        setMovies(trimmed);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="carousel">
      <h1 className="carousel-title">{title}</h1>
      <div className="full-width-section">
        <div className="movie-carousel">
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie, index) => (
              <div key={index} className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularMovies;
