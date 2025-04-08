import React from "react";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";


function BrowseMovies() {
  return (
    <div className="container text-center mt-5">
      <div className="popular-movies-section">
        <PopularMovies title="Trending Now" />
      </div>
    </div>
  );
}

export default BrowseMovies;