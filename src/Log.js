import React from "react";
import PopularMovies from "./PopularMovies";
import "./Log.css";

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



function Log() {
  return (
    <>
      <div className="log-container">
        <h1>Search Your Movie Log</h1>

        <div className="log-search">
          <input type="text" name="name" placeholder="Search movie title..." />
          <input type="submit" value="Search" />
        </div>
      </div>

      <PopularMovies title="Popular Movies" movies={mockMovies} />
    </>
  );
}

export default Log;
