import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { useAuth } from "../../../Contexts/authContexts";
import "./ProfileStats.css";
import { Link } from "react-router-dom";

function ProfileStats() {

  const { user } = useAuth();
  const [logCount, setLogCount] = useState(0);
  const [listCount, setListCount] = useState(0);

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
          .eq("user_id", user.id)
      ]);

      setLogCount(logs || 0);
      setListCount(lists || 0);
    };

    fetchStats();
  }, [user]);

  return (
    <div>
      <div className="profile-container-stats">
        <img
          src="pictures/profileicon.png"
          alt="User"
          className="profile-image-stats"
        />
        <div className="profile-text-stats">
          <h1>Welcome {user?.user_name}</h1>
        </div>
      </div>

      <div className="profile-bottom-section-stats">
        <div className="tabs-wrapper-stats">
          <Link to="/profile" className="tab-button-stats">My diary</Link>
          <Link to="/profilelists" className="tab-button-stats">My lists</Link>
          <Link to="/profilestats" className="tab-button-stats active">My stats</Link>
        </div>
        <div className="profile-content-stats">
          <div className="diary-entry-stats">
            <h2>My Stats</h2>
            <p><strong>Movies logged:</strong> {logCount}</p>
            <p><strong>Lists created:</strong> {listCount}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfileStats;