import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">Green Journey</NavLink>
        </div>
        {/* Left side nav items */}
        <ul className={`navbar-links-left ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/calculate" onClick={() => setIsMenuOpen(false)}>
              Calculate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/safety-guidelines"
              onClick={() => setIsMenuOpen(false)}
            >
              Safety Guidelines
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
        {/* Right side nav items */}
        <ul className={`navbar-links-right ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className="signin"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </NavLink>
          </li>
        </ul>
        {/* Hamburger menu for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
