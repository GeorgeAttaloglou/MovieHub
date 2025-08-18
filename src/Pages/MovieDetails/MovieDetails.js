import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarMoviesCarousel from "../../Components/SimilarMovies/SimilarMovies";
import "./MovieDetails.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const PROFILE_IMG = "https://image.tmdb.org/t/p/w185";

const MovieDetail = () => {
  // Get the movie ID from the URL
  const { id } = useParams();

  // Declare states for movie details, cast, and any errors
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  // Fetch movie details and cast when the ID changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      }
    };

    const fetchMovieCast = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();
        setCast(data.cast.slice(0, 10)); // Get the top 10 actors
      } catch (err) {
        console.error("Failed to fetch cast:", err);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  // Return error message or loading if movie is not yet available
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading movie details...</p>;

  return (
    <>
      {/* Main section with movie details */}
      <div className="detail-section">
        <div className="movie-detail-container">
          {/* Display poster */}
          <div className="movie-poster">
            <img
              src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : ""}
              alt={movie.title}
            />
          </div>

          {/* Movie information */}
          <div className="movie-info">
            <h1 className="movie-title">
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h1>

            {/* Rating and genres */}
            <div className="movie-meta">
              <div className="user-stars">
                {(movie.vote_average).toFixed(1)} / 10 ⭐
              </div>
              {movie.genres?.map((g) => (
                <span key={g.id} className="genre-badge">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Movie description and additional info */}
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>

              <div className="movie-facts">
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Runtime:</strong> {movie.runtime} min</p>
                <p><strong>Language:</strong> {movie.original_language?.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section with top actors */}
      <div className="detail-section">
        <div className="movie-cast">
          <h3>Top Cast</h3>
          <div className="cast-grid">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-card">
                <img
                  src={
                    actor.profile_path
                      ? `${PROFILE_IMG}${actor.profile_path}`
                      : "/pictures/portrait.jpg"
                  }
                  alt={actor.name}
                />
                <p><strong>{actor.name}</strong></p>
                <p>{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel with similar movies */}
      <SimilarMoviesCarousel movieId={id} />
    </>
  );
};

export default MovieDetail;
