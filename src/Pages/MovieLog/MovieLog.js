import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient"
import { useAuth } from '../../Contexts/authContexts'
import { v4 as uuidv4 } from 'uuid'

import SimilarMoviesCarousel from "../../Components/SimilarMovies/SimilarMovies";

import "./MovieLog.css";

// Σταθερές για το API
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w300";

function MovieLog() {
  // Παίρνουμε το ID της ταινίας από το URL
  const { id } = useParams();

  // Δηλώνουμε τα states για την ταινία, αξιολόγηση, hover effect, κριτική
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");

  const { user } = useAuth();

  // Φέρνουμε τα στοιχεία της ταινίας με βάση το ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    };

    fetchMovie();
  }, [id]);

  // Συνάρτηση για την καταγραφή ταινίας στο Supabase
  const handleLog = async () => {
    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    try {
      if (!user) {
        alert("You need to be logged in to log a movie.");
        return;
      }

      const { error } = await supabase.from("logs").insert([
        {
          id: uuidv4(),
          user_id: user.id,
          review: review,
          movie_id: id,
          rating: rating,
          movie_name: movie.title,
        },
      ]);

      if (error) {
        console.error("Unexpected error:", error);
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        alert("Movie logged successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(`An unexpected error occurred: ${err.message}`);
    }
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      {/* Κεντρικό section για log ταινίας */}
      <div className="log-movie-container">
        <div className="log-header">
          {/* Αφίσα ταινίας */}
          <img
            src={
              movie.poster_path
                ? `${IMG_URL}${movie.poster_path}`
                : "/assets/no-image.jpg"
            }
            alt={movie.title}
          />

          {/* Κριτική χρήστη */}
          <div className="log-info">
            <h2>Logging: {movie.title}</h2>
            <label>Review <span>(optional)</span></label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your thoughts..."
            />
          </div>
        </div>

        {/* Αξιολόγηση ταινίας */}
        <div className="log-rating">
          <p>Rate this movie:</p>
          <div className="stars">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(0)}
                className={
                  (hovered || rating) > i ? "star active" : "star"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Κουμπί υποβολής */}
        <button className="log-button" onClick={handleLog}>
          LOG
        </button>
      </div>

      {/* Εμφάνιση carousel με παρόμοιες ταινίες */}
      <SimilarMoviesCarousel movieId={id} />
    </>
  );
}

export default MovieLog;
