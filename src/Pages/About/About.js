import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div>
      <div className="about-container">

        { /* Ενότητα Επικεφαλίδας "Σχετικά με εμάς" */}
        <div className="about-us-text-center">
          <h1 className="about-title">
            About Us
          </h1>
          <p className="about-text">
            MovieHub is a platform that helps you discover new movies and series based on your interests. You can keep track of your favorite movies, mark what you've watched, and rate your favorites.
          </p>
        </div>

        {/* Ενότητα 1 - Ανακάλυψε Νέες Ταινίες (Εικόνα Αριστερά, Κείμενο Δεξιά) */}
        <div className="about-section">
          <img src="pictures/movie-watching.jpg" alt="Movie Experience" className="about-image" />
          <div className="about-text-container">
            <h2 className="about-title">
              <Link to="/browse-movies">Discover New Movies</Link>
            </h2>
            <p className="about-text">
              MovieHub helps you explore trending movies and series based on your interests.
            </p>
          </div>
        </div>

        {/* Ενότητα 2 - Παρακολούθησε τι βλέπεις (Κείμενο Αριστερά, Εικόνα Δεξιά) */}
        <div className="about-section reverse">
          <div className="about-text-container">
            <h2 className="about-title">
              <Link to="/create-list">Track What You Watch</Link>
            </h2>
            <p className="about-text">
              Keep track of your favorite movies, mark what you've watched, and rate your favorites.
            </p>
          </div>
          <img src="pictures/movie-tracking.jpg" alt="Tracking Movies" className="about-image" />
        </div>

        {/* Ενότητα 3 - Πάροχος API TMDB */}
        <div className="about-section">
          <img src="pictures/tmdb-logo.svg" alt="tmdb-logo" className="about-image" />
          <div className="about-text-container">
            <h2 className="about-title">
              <Link to="https://developer.themoviedb.org/docs/getting-started">Our API provider</Link>
            </h2>
            <p className="about-text">
              MovieHub uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

        {/* Ενότητα 4 - Πάροχος Βάσης Δεδομένων Supabase */}
        <div className="about-section">
          <img src="pictures/supabase-logo-wordmark--dark.png" alt="supabase-logo" className="about-image" />
          <div className="about-text-container">
            <h2 className="about-title">
              <Link to="https://supabase.com/">Our databse provider</Link>
            </h2>
            <p className="about-text">
              MovieHub uses supabase for its databse needs but is not endorsed or certified but supabase.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
