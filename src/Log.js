import React from "react";
import "./Log.css";

function Log() {
  return (
    <div className="log-container">
      <h1>Log</h1>

      <div className="log-search">
      <input type="text" name="name" />
      <input type="submit" value="Search" />
      </div>
    </div>
  );
}

export default Log;