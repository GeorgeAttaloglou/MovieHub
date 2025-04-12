import React from "react";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import "./Log.css";

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

      <PopularMovies title="Popular Movies" />
    </>
  );
}

export default Log;
