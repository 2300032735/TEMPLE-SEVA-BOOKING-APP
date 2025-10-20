// App.jsx
import React from "react";
import SevaManager from "./components/SevaManager";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div>
      {/* Header */}
      <header className="navbar">
        <div className="nav-logo">
          <img src="/reactsevaapi/puri.jpg" alt="Temple Logo" className="logo" />
          <h1>Seva Booking Portal</h1>
        </div>
      </header>

      {/* Title BEFORE the image */}
      <div className="top-title">
        <h2>🪔 Book Your Seva Online</h2>
        <p>Experience divine blessings from the comfort of your home</p>
      </div>

      {/* Hero Section with background image and SevaManager in the middle */}
      <div className="hero">
        <div className="seva-overlay-container">
          <SevaManager />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Seva Booking Portal | Powered by Divine Services</p>
      </footer>
    </div>
  );
}

export default App;
