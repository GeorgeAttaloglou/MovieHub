import React from "react";
import "./ProfileStats.css";
import { Link } from "react-router-dom";

function ProfileStats() {
  return (
    <div>
      <div className="profile-container-stats">
        <img
          src="pictures/profileicon.png"
          alt="User"
          className="profile-image-stats"
        />
        <div className="profile-text-stats">
          <h1>Username</h1>
          <p>Joined 26/3/2025</p>
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
            <p>
              This is where the stats will be displayed.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ProfileStats;