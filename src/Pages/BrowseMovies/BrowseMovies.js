import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link for routing
import "./BrowseMovies.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BrowseMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

    const res = await fetch(url);
    const data = await res.json();
    const filtered = data.results.filter((movie) => {
      return (
        (!genre || movie.genre_ids.includes(Number(genre))) &&
        (!year || movie.release_date?.startsWith(year)) &&
        (!rating || movie.vote_average >= Number(rating))
      );
    });

    setMovies(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSearchResults(data.results.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };

    const timeout = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeout); // debounce
  }, [searchQuery]);


  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="browse-container">
      <h1 className="browse-title">Browse Movies</h1>
      <form onSubmit={handleSearch} className="filters">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="878">Science Fiction</option>
          <option value="10749">Romance</option>
          <option value="16">Animation</option>
          <option value="80">Crime</option>
          <option value="9648">Mystery</option>
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Any Year</option>
          {[...Array(25)].map((_, i) => {
            const y = 2025 - i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="9">9+</option>
          <option value="8">8+</option>
          <option value="7">7+</option>
          <option value="6">6+</option>
        </select>
        <button type="submit">Search</button>
      </form>
      
      {searchResults.length > 0 && (
          <ul className="browse-search-result">
            {searchResults.map((movie) => (
              <li
                key={movie.id}
                onClick={() => {
                  setSearchQuery(movie.title);
                  setSearchResults([]);
                  fetchMovies(); // auto trigger
                }}
              >
                {movie.title}
              </li>
            ))}
          </ul>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {movies.length === 0 ? (
            <p>No results found.</p>
          ) : (
            movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>⭐ {parseFloat(movie.vote_average).toFixed(1)}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseMovies;
