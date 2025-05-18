import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./BrowseMovies.css";

// Constants
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

//Main Component
const BrowseMovies = () => {

  //States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch movies from the API 
  // Filters the results based on the filters selected by the user
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);

    let url = searchQuery.trim()
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
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
    } catch (err) {
      console.error("Error fetching movies", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, genre, year, rating]);

  //Effect to load movies when filters or query change 
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  //Effect for automatic search suggestions (autocomplete)
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

    const timeout = setTimeout(fetchSearchResults, 300); // debounce
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="browse-container">
      <h1 className="browse-title">Browse Movies</h1>

      {/* Search filters */}
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

      {/* Search suggestions */}
      {searchResults.length > 0 && (
        <ul className="browse-search-result">
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              onClick={() => {
                setSearchQuery(movie.title);
                setSearchResults([]);
                fetchMovies();
              }}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}

      {/* Display movies */}
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
