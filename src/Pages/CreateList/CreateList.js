import React, { useState } from "react";
import "./CreateList.css";

const mockMovies = [
  { title: "Inception", image: "/movies/inception.png" },
  { title: "Interstellar", image: "/movies/interstellar.png" },
  { title: "The Matrix", image: "/movies/matrix.png" },
  { title: "Parasite", image: "/movies/parasite.jpg" },
  { title: "Avengers", image: "/movies/avengers.jpg" },
  { title: "Batman: The Dark Knight", image: "/movies/batman.jpg" },
  { title: "Fight Club", image: "/movies/fightclub.png" },
  { title: "Pulp Fiction", image: "/movies/pulpfiction.jpg" },
  { title: "The Shawshank Redemption", image: "/movies/shawshank.jpg" },
  { title: "Forrest Gump", image: "/movies/forest.jpg" },
];

function CreateList() {
  const [listName, setListName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);

  const filteredMovies = mockMovies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        !selectedMovies.some((m) => m.title === movie.title)
    )
    .slice(0, 5); // limit results

  const addMovie = (movie) => {
    setSelectedMovies((prev) => [...prev, movie]);
  };

  const removeMovie = (title) => {
    setSelectedMovies((prev) => prev.filter((movie) => movie.title !== title));
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
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, i) => (
            <div key={i} className="search-result">
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
        {selectedMovies.map((movie, i) => (
          <div key={i} className="selected-movie-card">
            <img src={movie.image} alt={movie.title} />
            <p>{movie.title}</p>
            <button onClick={() => removeMovie(movie.title)}>Remove</button>
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
