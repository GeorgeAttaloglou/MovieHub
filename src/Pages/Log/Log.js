import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import "./Log.css";

// Get the API key from the .env file
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Log() {
  // Use state to store the search query and results
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  // Fetch movies from TMDB when the user types
  useEffect(() => {
    const fetchMovies = async () => {
      // If the query is empty, clear the results
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        // Get the first 6 results
        setResults(data.results.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch movie search results", err);
      }
    };

    // Delay the search by 300ms (debounce)
    const timeout = setTimeout(fetchMovies, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // When the user selects a movie, navigate to the log page with the movie id
  const handleClick = (movieId) => {
    navigate(`/movie-log/${movieId}`);
  };

  return (
    <>
      {/* This is the main section where the user can search for the movie they watched */}
      <div className="log-container">
        <h1>Log your most recent watch!</h1>

        {/* Input for searching movie title */}
        <div className="log-search">
          <input
            type="text"
            placeholder="Search movie title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Display the search results */}
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

      {/* Import the component with popular movies */}
      <PopularMovies title="Popular Movies" />
    </>
  );
}

export default Log;
