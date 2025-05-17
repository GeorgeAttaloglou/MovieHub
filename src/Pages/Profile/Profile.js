import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../Contexts/authContexts";
import { Link } from "react-router-dom";

import "./Profile.css";

// Base URL for movie posters
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function Profile() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [movieData, setMovieData] = useState({});

  // Load user's log entries and corresponding posters
  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching logs", error);
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        setLogs(data);
        fetchMoviePosters(data); // also fetch posters for each log
      }
    };

    const fetchMoviePosters = async (logs) => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const posters = {};

      for (const log of logs) {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${log.movie_id}?api_key=${apiKey}`);
          const data = await res.json();
          posters[log.movie_id] = data.poster_path;
        } catch (err) {
          console.error(`Failed to fetch poster for movie ${log.movie_id}`, err);
        }
      }

      setMovieData(posters);
    };

    fetchLogs();
  }, [user]);

  // Function that renders stars for each log (up to 5)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;

    return (
      <div className="log-stars-container">
        <div className="rating-stars">
          {Array(fullStars).fill().map((_, i) => (
            <span key={`f-${i}`} className="star filled">★</span>
          ))}
          {Array(emptyStars).fill().map((_, i) => (
            <span key={`e-${i}`} className="star">☆</span>
          ))}
        </div>
        <div className="rating-numeric">{rating} / 10</div>
      </div>
    );
  };

  return (
    <div>
      {/* Top section with user image and name */}
      <div className="profile-container">
        <img src="pictures/profileicon.png" alt="User" className="profile-image" />
        <div className="profile-text">
          <h1>Welcome {user?.user_name || "back!"}</h1>
        </div>
      </div>

      {/* Tabs for navigating profile sections */}
      <div className="profile-bottom-section">
        <div className="tabs-wrapper">
          <Link to="/profile" className="tab-button active">My diary</Link>
          <Link to="/profilelists" className="tab-button">My lists</Link>
          <Link to="/profilestats" className="tab-button">My stats</Link>
        </div>

        {/* Diary content with user's logs */}
        <div className="profile-content">
          <div className="diary-entry">
            <h2>Diary Entries</h2>
            {logs.length === 0 ? (
              <p className="no-results">No logs found.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-row">
                  <Link to={`/movie/${log.movie_id}`}>
                    <img
                      src={movieData[log.movie_id] ? `${TMDB_IMAGE_BASE}${movieData[log.movie_id]}` : "/pictures/placeholder.jpg"}
                      alt={log.movie_name}
                      className="log-poster"
                    />
                  </Link>
                  <div className="log-row-info">
                    <Link to={`/movie/${log.movie_id}`} className="log-title-link">
                      <h3>{log.movie_name}</h3>
                    </Link>
                    <p className="log-review">{log.review || "No review written."}</p>
                    <p className="log-date">{new Date(log.created_at).toLocaleDateString()}</p>
                  </div>
                  {renderStars(log.rating)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
