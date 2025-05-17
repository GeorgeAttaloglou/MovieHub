import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../../Contexts/authContexts";
import { Link } from "react-router-dom";

import "./ProfileLists.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

function ProfileLists() {
  const { user } = useAuth();

  // Store lists and movie details
  const [lists, setLists] = useState([]);
  const [expandedListIds, setExpandedListIds] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  // When the user loads, fetch lists and corresponding movie details
  useEffect(() => {
    if (!user) return;

    const fetchLists = async () => {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching lists", error);
      } else {
        setLists(data);

        // Gather all unique movie_ids from the lists
        const movieIds = [...new Set(data.flatMap(list => list.movie_ids))];
        const details = {};

        // Fetch each movie's data from the TMDB API
        await Promise.all(
          movieIds.map(async (id) => {
            try {
              const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
              const json = await res.json();
              details[id] = json;
            } catch (err) {
              console.error("Error fetching movie", err);
            }
          })
        );

        setMovieDetails(details);
      }
    };

    fetchLists();
  }, [user]);

  // Toggle display of each list's content
  const toggleList = (id) => {
    setExpandedListIds((prev) =>
      prev.includes(id) ? prev.filter((lid) => lid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Top section with user image and name */}
      <div className="profile-container-lists">
        <img src="pictures/profileicon.png" alt="User" className="profile-image-lists" />
        <div className="profile-text-lists">
          <h1>Welcome {user?.user_name || "back!"}</h1>
        </div>
      </div>

      {/* Tabs for navigation */}
      <div className="profile-bottom-section-lists">
        <div className="tabs-wrapper-lists">
          <Link to="/profile" className="tab-button-lists">My diary</Link>
          <Link to="/profilelists" className="tab-button-lists active">My lists</Link>
          <Link to="/profilestats" className="tab-button-lists">My stats</Link>
        </div>

        {/* Render user's lists */}
        <div className="profile-content-lists">
          <div className="diary-entry-lists">
            <h2>Lists</h2>
            {lists.length === 0 ? (
              <p>No lists found.</p>
            ) : (
              lists.map((list) => (
                <div key={list.list_id} className="list-group">
                  {/* List title and toggle */}
                  <div className="list-title" onClick={() => toggleList(list.list_id)}>
                    {list.list_title}
                    <span>{expandedListIds.includes(list.list_id) ? " ▲" : " ▼"}</span>
                  </div>

                  {/* If the list is open, show movies */}
                  {expandedListIds.includes(list.list_id) && (
                    <div className="list-movie-grid">
                      {list.movie_ids.map((id) => {
                        const movie = movieDetails[id];
                        return movie ? (
                          <Link to={`/movie/${id}`} key={id} className="movie-card-link">
                            <div className="movie-card">
                              <img src={`${TMDB_IMAGE_BASE}${movie.poster_path}`} alt={movie.title} />
                              <p>{movie.title}</p>
                            </div>
                          </Link>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLists;
