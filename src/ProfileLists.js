import React from "react";
import "./ProfileLists.css";
import { Link } from "react-router-dom";

function ProfileLists() {
  return (
    <div>
      <div className="profile-container-lists">
        <img
          src="/profileicon.png"
          alt="User"
          className="profile-image-lists"
        />
        <div className="profile-text-lists">
          <h1>Username</h1>
          <p>Joined 26/3/2025</p>
        </div>
      </div>

      <div className="profile-bottom-section-lists">
        <div className="tabs-wrapper-lists">
          <Link to="/profile" className="tab-button-lists">My diary</Link>
          <Link to="/profilelists" className="tab-button-lists active">My lists</Link>
          <Link to="/profilestats" className="tab-button-lists">My stats</Link>
        </div>
        <div className="profile-content-lists">
          <div className="diary-entry-lists">
            <h2>Lists</h2>
            <p>
              This is where the lists will be displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLists;
