// src/Pages/ProfileStats/ProfileStats.js

import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../../Contexts/authContexts";
import { Link } from "react-router-dom";
import "./ProfileStats.css";

function ProfileStats() {
  const { user } = useAuth();
  const [logCount, setLogCount] = useState(0);
  const [listCount, setListCount] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [firstLog, setFirstLog] = useState(null);
  const [latestLog, setLatestLog] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const [{ count: logs }, { count: lists }] = await Promise.all([
        supabase
          .from("logs")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("lists")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

      setLogCount(logs || 0);
      setListCount(lists || 0);
    };

    const fetchExtraStats = async () => {
      const { data: ratingsData } = await supabase
        .from("logs")
        .select("rating")
        .eq("user_id", user.id);

      if (ratingsData?.length > 0) {
        const total = ratingsData.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating((total / ratingsData.length).toFixed(1));
      }

      const { data: logsAsc } = await supabase
        .from("logs")
        .select("movie_name")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1);
      setFirstLog(logsAsc?.[0]?.movie_name);

      const { data: logsDesc } = await supabase
        .from("logs")
        .select("movie_name")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      setLatestLog(logsDesc?.[0]?.movie_name);
    };

    fetchStats();
    fetchExtraStats();
  }, [user]);

  return (
    <div>
      <div className="profile-container-stats">
        <img src="pictures/profileicon.png" alt="User" className="profile-image-stats" />
        <div className="profile-text-stats">
          <h1>Welcome {user?.user_name || "back!"}</h1>
        </div>
      </div>

      <div className="profile-bottom-section-stats">
        <div className="tabs-wrapper-stats">
          <Link to="/profile" className="tab-button-stats">My diary</Link>
          <Link to="/profilelists" className="tab-button-stats">My lists</Link>
          <Link to="/profilestats" className="tab-button-stats active">My stats</Link>
        </div>

        <div className="profile-content-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Movies Logged</h3>
              <p className="stat-number">{logCount}</p>
            </div>
            <div className="stat-card">
              <h3>Lists Created</h3>
              <p className="stat-number">{listCount}</p>
            </div>
            <div className="stat-card">
              <h3>Average Rating</h3>
              <p className="stat-number">{averageRating ?? "—"}</p>
            </div>
            <div className="stat-card">
              <h3>First Movie Logged</h3>
              <p className="stat-number">{firstLog ?? "—"}</p>
            </div>
            <div className="stat-card">
              <h3>Latest Movie Logged</h3>
              <p className="stat-number">{latestLog ?? "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
