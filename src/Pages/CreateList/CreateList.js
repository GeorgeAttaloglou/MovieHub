import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"
import { useAuth } from '../../Contexts/authContexts'
import { v4 as uuidv4 } from 'uuid'
import "./CreateList.css";
import { Link } from "react-router-dom";


const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function CreateList() {
  const [listName, setListName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!search) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            search
          )}&api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();

        if (data.results) {
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

  const addMovie = (movie) => {
    setSelectedMovies((prev) => [...prev, movie]);
  };

  const removeMovie = (id) => {
    setSelectedMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  /* This always throws an error but th logic should be good. Need to implement login page */
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

      const { data, error } = await supabase.from("lists").insert([
        {
          list_title: listName,
          user_id: user.id,
          list_id: uuidv4(),
          movie_ids: selectedMovies.map((movie) => movie.id),
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
      <h1>Create a New Movie List</h1>

      <input
        className="list-name-input"
        type="text"
        placeholder="Enter list name..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <div key={movie.id} className="search-result">
              <Link to={`/movie/${movie.id}`} className="search-title-link">
                {movie.title}
              </Link>
              <button onClick={() => addMovie(movie)}>Add</button>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>

      <h2>Movies in This List</h2>
      <div className="selected-movies">
        {selectedMovies.map((movie) => (
          <div key={movie.id} className="selected-movie-card">
            <Link to={`/movie/${movie.id}`} className="selected-link">
              <img src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </Link>
            <button onClick={() => removeMovie(movie.id)}>Remove</button>
          </div>
        ))}
      </div>

      <button className="save-button" onClick={handleSaveList}>
        Save List
      </button>
    </div>
  );
}

export default CreateList;
