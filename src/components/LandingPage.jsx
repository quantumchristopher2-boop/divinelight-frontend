// === LandingPage.jsx ===
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  // Add safe fallback if env vars are missing
  const SCHOOL_NAME = process.env.REACT_APP_SCHOOL_NAME || 'Divine Light Schools';
  const SCHOOL_EMAIL = process.env.REACT_APP_SCHOOL_EMAIL || 'info@divinelight.edu';
  const SCHOOL_PHONE = process.env.REACT_APP_SCHOOL_PHONE_WHATSAPP || '+234000000000';
  const SCHOOL_ADDRESS = process.env.REACT_APP_SCHOOL_ADDRESS || '123 School St, City';

  return (
    <div className="landing">
      <header className="hero">
        <nav className="navbar">
          <h1>🏫 {SCHOOL_NAME}</h1>
          <button onClick={() => navigate('/login')} className="nav-login-btn">
            Login
          </button>
        </nav>

        <div className="hero-content">
          <h1>Welcome to {SCHOOL_NAME}</h1>
          <p>Empowering Excellence Through Quality Education</p>
          <button onClick={() => navigate('/login')} className="cta-btn">
            Access Portal
          </button>
        </div>
      </header>

      <section className="features">
        <h2>Our School Management System</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🎓</div>
            <h3>Student Portal</h3>
            <p>View results, attendance, and school announcements</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Teacher Dashboard</h3>
            <p>Manage grades, attendance, and student records</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍💼</div>
            <h3>Admin Panel</h3>
            <p>Complete school management and oversight</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👪</div>
            <h3>Parent Access</h3>
            <p>Monitor your child's academic progress</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 {SCHOOL_NAME}. All rights reserved.</p>
        <p>📍 {SCHOOL_ADDRESS}</p>
        <p>📧 {SCHOOL_EMAIL} | 📞 {SCHOOL_PHONE}</p>
      </footer>
    </div>
  );
}

export default LandingPage;