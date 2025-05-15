import React, { use, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"
import { useAuth } from "../../Contexts/authContexts"
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);


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
      }
    };

    fetchLogs();
  }, [user]);


  return (
    <div>
      <div className="profile-container">
        <img
          src="pictures/profileicon.png"
          alt="User"
          className="profile-image"
        />
        <div className="profile-text">
          <h1>Welcome {user?.email}</h1>
          <p>Joined {user?.created_at}</p>
          <p>User ID: {user?.id}</p>
        </div>
      </div>

      <div className="profile-bottom-section">
        <div className="tabs-wrapper">
          <Link to="/profile" className="tab-button active">My diary</Link>
          <Link to="/profilelists" className="tab-button">My lists</Link>
          <Link to="/profilestats" className="tab-button">My stats</Link>
        </div>
        <div className="profile-content">
          <div className="diary-entry">
            <h2>Diary Entry</h2>
            <p>
              {logs.length === 0 ? (
                <p>No logs found.</p>
              ) : (
                <ul>
                  {logs.map((log) => (
                    <li key={log.id}>
                      Movie ID: {log.movie_id}<br />
                      Rating: {log.rating} / 10<br />
                      Review: {log.review || "—"}
                    </li>
                  ))}
                </ul>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;