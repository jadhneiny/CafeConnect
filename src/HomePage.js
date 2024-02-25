// src/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="centered-blue-text">Welcome to the CafeConnect</h1>
      <img src="/logo.png" alt="Logo" className="homepage-logo" />
      <div className="navigation-links">
        <Link to="/signup" className="link-button">Sign Up</Link>
        <Link to="/login" className="link-button">Login</Link>
      </div>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are dedicated to bringing you the best cafeteria experience with our app. Benefit from saving your time and energy by simply checking the availability of your prefered items through our app.</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Real-time menu updates</li>
          <li>Full week menu preview</li>
          <li>Fast and secure viewing</li>
         {/* <li>Order history and reordering</li> */}
        </ul>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <p>&copy; 2024 CafeConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
