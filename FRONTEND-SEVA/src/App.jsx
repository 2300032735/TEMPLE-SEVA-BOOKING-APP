import React from "react";
import SevaManager from "./components/SevaManager";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div>
      {/* ====== Header ====== */}
      <header className="navbar">
        <div className="nav-logo">
          <img src="/puri.png" alt="Temple Logo" className="logo" />
          <h1>Seva Booking Portal</h1>
        </div>
      </header>

      {/* ====== Hero Banner ====== */}
      <div className="hero-section">
        <img src="/temple_1.jpg" alt="Temple Banner" className="hero-image" />
        <div className="hero-overlay">
          <h2>Book Your Seva Online</h2>
          <p>Experience divine blessings from the comfort of your home</p>
        </div>
      </div>

      {/* ====== Seva Manager Component ====== */}
      <main>
        <SevaManager />
      </main>

      {/* ====== Footer ====== */}
      <footer className="footer">
        <p>© 2025 Seva Booking Portal | Powered by Divine Services</p>
      </footer>
    </div>
  );
}

export default App;
