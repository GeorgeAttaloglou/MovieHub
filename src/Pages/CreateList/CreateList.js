import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContexts";
import { v4 as uuidv4 } from 'uuid'

import "./CreateList.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";


function CreateList() {

  // State for the list name, search, search results, and selected movies
  const [listName, setListName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect to search for movies when search or selectedMovies changes
  useEffect(() => {
  
    // Function to fetch movies from the TMDB API
    const fetchMovies = async () => {
      if (!search) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();

        if (data.results) {

          // Filter to exclude already selected movies and movies without a poster
          const filtered = data.results
            .filter(
              (movie) =>
                movie.poster_path &&
                !selectedMovies.some((m) => m.id === movie.id)
            )
            .slice(0, 5);
          setSearchResults(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, [search, selectedMovies]);

  // Add a movie to the selected movies list
  const addMovie = (movie) => {
    setSelectedMovies((prev) => [...prev, movie]);
  };

  // Remove a movie from the selected movies list
  const removeMovie = (id) => {
    setSelectedMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  // Save the list to the database via Supabase
  const handleSaveList = async () => {
    if (!listName.trim()) {
      alert("Please enter a list name.");
      return;
    }

    if (selectedMovies.length === 0) {
      alert("Please add at least one movie to the list.");
      return;
    }

    try {

      if (!user) {
        alert("You must be logged in to save a list.");
        return;
      }

      const { error } = await supabase.from("lists").insert([
        {
          list_title: listName,
          user_id: user.id,
          list_id: uuidv4(),
          movie_ids: selectedMovies.map((movie) => movie.id),
          movie_titles: selectedMovies.map((movie) => movie.title),
        },
      ]);

      if (error) {
        console.error("Error saving list:", error);
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        alert("List saved successfully!");
        setListName("");
        setSelectedMovies([]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(`An unexpected error occurred: ${err.message}`);
    }
  };

  return (
    <div className="create-list-container">
  
      {/* Modal blocker if the user is not logged in */}
      {!user && (
        <div className="create-list-blocker">
          <div className="blocker-modal">
            <h2>You need to be logged in to use this feature 😔</h2>
            <button onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
      )}

      {/* List name input */}
      <h1>Create a New Movie List</h1>
      <input
        className="list-name-input"
        type="text"
        placeholder="Enter list name..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        disabled={!user}
      />

      {/* Movie search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={!user}
        />
      </div>

      {/* Display search results */}  
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie.id} className="search-result">
              <Link to={`/movie/${movie.id}`} className="search-title-link">
                {movie.title}
              </Link>
              <button onClick={() => addMovie(movie)} disabled={!user}>
                Add
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>

      {/* Display selected movies */}
      <h2>Movies in This List</h2>
      <div className="selected-movies">
        {selectedMovies.map((movie) => (
          <div key={movie.id} className="selected-movie-card">
            <Link to={`/movie/${movie.id}`} className="selected-link">
              <img
                src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
            <button onClick={() => removeMovie(movie.id)} disabled={!user}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Save list button */}
      <button className="save-button" onClick={handleSaveList} disabled={!user}>
        Save List
      </button>
    </div>
  );
}

export default CreateList;
