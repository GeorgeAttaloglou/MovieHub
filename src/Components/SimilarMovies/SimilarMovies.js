import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SimilarMovies.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SimilarMoviesCarousel = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setSimilarMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch similar movies", err);
      }
    };

    if (movieId) fetchSimilarMovies();
  }, [movieId]);

  if (!similarMovies.length) return null;

  return (
    <div className="similar-section">
      <h3 className="carousel-title">You May Also Like</h3>
      <div className="movie-carousel">
        {similarMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarMoviesCarousel;
