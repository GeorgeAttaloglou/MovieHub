import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import LandingPage from "./Pages/LandingPage/LandingPage";
import Header from "./Components/Header/Header"; // Navbar
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import About from "./Pages/About/About"; // Import About page
import CreateList from "./Pages/CreateList/CreateList"; // Import CreateList page
import BrowseMovies from "./Pages/BrowseMovies/BrowseMovies"; // Import About page
import "./App.css";
import Profile from "./Pages/Profile/Profile";
import ProfileLists from "./Pages/Profile/ProfilePages/ProfileLists";
import ProfileStats from "./Pages/Profile/ProfilePages/ProfileStats";
import Log from "./Pages/Log/Log";
import Footer from "./Components/Footer/Footer"; // Corrected Footer component path
import MovieDetail from "./Pages/MovieDetails/MovieDetails";
import MovieLog from "./Pages/MovieLog/MovieLog"; // Import MovieLog page
import { AuthProvider } from "./Contexts/authContexts";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-list" element={<CreateList/>} />
        <Route path="/browse-movies" element={<BrowseMovies/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/log" element={<Log/>} />
        <Route path="/profilelists" element={<ProfileLists/>} />
        <Route path="/profilestats" element={<ProfileStats/>} />
        <Route path="/movie/:id" element={<MovieDetail />} />  
        <Route path="/movie-log/:id" element={<MovieLog />} /> {/* MovieLog page */}
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
