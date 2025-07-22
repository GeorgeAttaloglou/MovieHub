// src/Pages/EditList/EditList.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import PopupMessage from "../../Components/PopupMessage/PopupMessage";
import "./EditList.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function EditList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listTitle, setListTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [popup, setPopup] = useState({ visible: false, type: "", message: "" });

  const showPopupMessage = (type, message) => {
    setPopup({ visible: true, type, message });
  };

  // Fetch list data by ID
  useEffect(() => {
    const fetchList = async () => {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .eq("list_id", id)
        .single();

      if (!error && data) {
        setListTitle(data.list_title);
        setMovies(data.movie_ids || []);
      }
    };
    fetchList();
  }, [id]);

  // Fetch search results from TMDB
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();
      setSearchResults(data.results.slice(0, 5));
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleRemove = (movieId) => {
    setMovies((prev) => prev.filter((id) => id !== movieId));
  };

  const handleAdd = (movieId) => {
    if (!movies.includes(movieId)) {
      setMovies((prev) => [...prev, movieId]);
      setSearchQuery("");
      setSearchResults([]);
      setShowPopup(false);
    }
  };

  const handleSave = async () => {
    await supabase
      .from("lists")
      .update({
        list_title: listTitle,
        movie_ids: movies,
      })
      .eq("list_id", id);

    showPopupMessage("success", "List updated successfully!");
  };

  const handleDeleteList = async () => {
    try {
      const { error } = await supabase
        .from("lists")
        .delete()
        .eq("list_id", id);

      if (error) throw error;

      navigate("/profilelists");
    } catch (err) {
      console.error("Failed to delete list:", err.message);
      showPopupMessage("error", `Failed to delete list: ${err.message}`);
    }
  };

  return (
    <>
    {popup.visible && (
      <PopupMessage
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup({ ...popup, visible: false })}
      />
    )}
    <div className="edit-list-container">
      <h1>Edit Your List</h1>

      <input
        type="text"
        className="list-title-input"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />

      <div className="movie-grid">
        {movies.map((movieId) => (
          <MovieCard key={movieId} movieId={movieId} onRemove={handleRemove} />
        ))}
      </div>

      <button className="add-button" onClick={() => setShowPopup(true)}>
        + Add Movie
      </button>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>

      <button
        className="delete-button"
        onClick={() => setShowConfirmDelete(true)}
      >
        Delete List
      </button>

      {showPopup && (
        <div className="popup-backdrop">
          <div className="popup">
            <input
              type="text"
              placeholder="Search movie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ul className="search-results">
              {searchResults.map((movie) => {
                const isAdded = movies.includes(movie.id);

                return (
                  <li key={movie.id} style={{ opacity: isAdded ? 0.4 : 1 }}>
                    <img
                      src={
                        movie.poster_path
                          ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
                          : "https://via.placeholder.com/50x75?text=N/A"
                      }
                      alt={movie.title}
                    />
                    <span>{movie.title}</span>

                    {!isAdded && (
                      <button onClick={() => handleAdd(movie.id)}>Add</button>
                    )}
                  </li>
                );
              })}
            </ul>

            <button className="close-popup" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="popup-backdrop">
          <div className="popup">
            <p>Are you sure you want to delete this list?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleDeleteList}
                className="confirm-delete"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="close-popup"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

function MovieCard({ movieId, onRemove }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
      />
      <p>{movie.title}</p>
      <button onClick={() => onRemove(movie.id)}>Remove</button>
    </div>
  );
}

export default EditList;
