import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import "./Log.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Log() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data.results.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch movie search results", err);
      }
    };

    const timeout = setTimeout(fetchMovies, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleClick = (movieId) => {
    navigate(`/movie-log/${movieId}`);
  };

  return (
    <>
      <div className="log-container">
        <h1>Search Your Movie Log</h1>

        <div className="log-search">
          <input
            type="text"
            placeholder="Search movie title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {results.length > 0 && (
          <ul className="log-search-results">
            {results.map((movie) => (
              <li key={movie.id} onClick={() => handleClick(movie.id)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <PopularMovies title="Popular Movies" />
    </>
  );
}

export default Log;
