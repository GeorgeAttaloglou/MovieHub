import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import LandingPage from "./LandingPage";
import Header from "./Header"; // Navbar
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import About from "./About"; // Import About page
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
