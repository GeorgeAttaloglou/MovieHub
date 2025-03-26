import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import LandingPage from "./LandingPage";
import Header from "./Header"; // Navbar
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import About from "./About"; // Import About page
import CreateList from "./CreateList"; // Import CreateList page
import BrowseMovies from "./BrowseMovies"; // Import About page
import "./App.css";
import Profile from "./Profile";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Log from "./Log";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-list" element={<CreateList/>} />
        <Route path="/browse-movies" element={<BrowseMovies/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/log" element={<Log/>} />
        <Route path="/profile2" element={<Profile2/>} />
        <Route path="/profile3" element={<Profile3/>} />  
      </Routes>
    </>
  );
}

export default App;
