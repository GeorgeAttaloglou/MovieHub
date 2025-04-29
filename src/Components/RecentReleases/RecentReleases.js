import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../PopularMovies/PopularMovies.css"; // Reuse same CSS

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function RecentReleases({ title }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const today = new Date();
        const twoWeeksAgo = new Date(today);
        twoWeeksAgo.setDate(today.getDate() - 30);
        const todayStr = today.toISOString().split("T")[0];
        const twoWeeksAgoStr = twoWeeksAgo.toISOString().split("T")[0];

        const trimmed = data.results
          .filter(movie => movie.release_date && movie.release_date >= twoWeeksAgoStr && movie.release_date <= todayStr)
          .map(movie => ({
            id: movie.id,
            title: movie.title,
            image: `${TMDB_IMAGE_BASE}${movie.poster_path}`,
          }));

        setMovies(trimmed);
      } catch (error) {
        console.error("Failed to fetch recent releases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMovies();
  }, []);

  return (
    <div className="carousel">
      <h1 className="carousel-title">{title}</h1>
      <div className="full-width-section">
        <div className="movie-carousel">
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <p>{movie.title}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentReleases;
