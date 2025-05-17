import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import "./Log.css";

// Παιρνουμε το API key απο το .env αρχείο
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Log() {
  // Χρησιμοποιουμε state για να αποθηκευσουμε το query αναζητησης και τα αποτελεσματα
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  // Εδω γινεται το fetch των ταινιων απο το TMDB οταν ο χρηστης πληκτρολογει
  useEffect(() => {
    const fetchMovies = async () => {
      // Αν το query ειναι κενο καθαριζουμε τα αποτελεσματα
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        // Παίρνουμε τα πρώτα 6 αποτελέσματα
        setResults(data.results.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch movie search results", err);
      }
    };

    // Καθυστερουμε την αναζητηση για 300ms (debounce)
    const timeout = setTimeout(fetchMovies, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Οταν ο χρηστης επιλεξει μια ταινια, παμε στην σελιδα του log με το id της ταινιας
  const handleClick = (movieId) => {
    navigate(`/movie-log/${movieId}`);
  };

  return (
    <>
      {/* Εδω ειναι το κεντρικο section οπου ο χρηστης μπορει να αναζητησει την ταινια που ειδε */}
      <div className="log-container">
        <h1>Log your most recent watch!</h1>

        {/* Εισαγωγη για την αναζητηση τιτλου ταινιας */}
        <div className="log-search">
          <input
            type="text"
            placeholder="Search movie title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Εμφανιζουμε τα αποτελεσματα της αναζητησης */}
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

      {/* Εδω γινεται εισαγωγη του component με τις δημοφιλεις ταινιες */}
      <PopularMovies title="Popular Movies" />
    </>
  );
}

export default Log;
