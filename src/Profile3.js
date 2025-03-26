import React from "react";
import "./Profile3.css";
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
            <Link to="/profile" className="tab-button">My diary</Link>
            <Link to="/profile2" className="tab-button">My lists</Link>
            <Link to="/profile3" className="tab-button active">My stats</Link>
        </div>
        <div className="profile-content">
          <div className="diary-entry">
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

export default Profile;