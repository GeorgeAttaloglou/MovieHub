import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar for Large Screens */}
      {!isMobile && (
        <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
          <Container className="d-flex justify-content-between align-items-center">
            {/* Brand on the Left */}
            <Navbar.Brand as={Link} to="/" className="fw-bold text-purple">
              MovieHub
            </Navbar.Brand>

            {/* Navbar Links moved closer to the right */}
            <Nav className="ms-auto me-3">
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/create-list">Create List</Nav.Link>
              <Nav.Link as={Link} to="/browse-movies">Browse Movies</Nav.Link>
            </Nav>

            {/* Icons & Buttons on the Right */}
            <div className="navbar-icons">
              <Link to="/profile">
                <img src="pictures/profileicon.png" alt="User" className="user-icon" />
              </Link>

              <Link to="/log">
                <button className="btn btn-gradient">LOG</button>
              </Link>
              
            </div>
          </Container>
        </Navbar>
      )}

      {/* Navbar for Small Screens (Unchanged) */}
      {isMobile && (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
          <Container className="d-flex justify-content-between align-items-center position-relative">
            {/* Hamburger Menu on the Left */}
            <Navbar.Toggle aria-controls="small-navbar-nav" className="me-2" />

            {/* Brand Name Always Centered & Static */}
            <div className="position-absolute start-50 translate-middle-x">
              <Navbar.Brand as={Link} to="/" className="fw-bold text-purple">
                MovieHub
              </Navbar.Brand>
            </div>

            {/* Icons & Buttons on the Right */}
            <div className="navbar-icons ms-auto">
              <Link to="/profile">
              <img src="pictures/profileicon.png" alt="User" className="user-icon" />
              </Link>
              
              <Link to="/log">
                <button className="btn btn-gradient">LOG</button>
              </Link>
            </div>
          </Container>

          {/* Collapsible Menu */}
          <Navbar.Collapse id="small-navbar-nav" className="w-100">
            <Nav className="text-center w-100">
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/create-list">Create List</Nav.Link>
              <Nav.Link as={Link} to="/browse-movies">Browse Movies</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};

export default Header;
