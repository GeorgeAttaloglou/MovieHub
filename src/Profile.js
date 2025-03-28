import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div>
      <div className="profile-container">
        <img
          src="/profileicon.png"
          alt="User"
          className="profile-image"
        />
        <div className="profile-text">
          <h1>Username</h1>
          <p>Joined 26/3/2025</p>
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
              You watched "The Shawshank Redemption" on 26/3/2025 and rated it 5 stars.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Profile;