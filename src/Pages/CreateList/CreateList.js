// src/pages/CreateList/CreateList.js

import React, { useState, useEffect } from "react";
import "./CreateList.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function CreateList() {
  const [listName, setListName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

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

  const handleSave = () => {
    alert(`List "${listName}" with ${selectedMovies.length} movies saved!`);
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
              <span>{movie.title}</span>
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
            <img
              src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <button onClick={() => removeMovie(movie.id)}>Remove</button>
          </div>
        ))}
      </div>

      <button className="save-button" onClick={handleSave}>
        Save List
      </button>
    </div>
  );
}

export default CreateList;
