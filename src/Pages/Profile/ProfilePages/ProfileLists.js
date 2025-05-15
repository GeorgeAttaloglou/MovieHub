import React, { use, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient"
import { useAuth } from "../../../Contexts/authContexts"
import "./ProfileLists.css";
import { Link } from "react-router-dom";

function ProfileLists() {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);

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
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        setLists(data);
      }
    };

    fetchLists();
  }, [user]);


  return (
    <div>
      <div className="profile-container-lists">
        <img
          src="pictures/profileicon.png"
          alt="User"
          className="profile-image-lists"
        />
        <div className="profile-text-lists">
          <h1>Welcome {user?.user_name}</h1>
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
              {lists.length === 0 ? (
                <p>no lists found.</p>
              ) : (
                <ul>
                  {lists.map((list) => (
                    <li key={list.id}>
                      <strong>{list.list_title}</strong><br />
                      Movies: {list.movie_ids.join(", ")}
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

export default ProfileLists;
