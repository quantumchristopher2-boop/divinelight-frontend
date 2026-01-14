import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👨‍🏫 Divine Light Schools - Teacher Dashboard</h1>
        <div className="user-info">
          <span>👤 {user.full_name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="overview-grid">
          <div className="stat-card">
            <h3>My Classes</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">120</p>
          </div>
          <div className="stat-card">
            <h3>Pending Results</h3>
            <p className="stat-number">2</p>
          </div>
        </div>

        <div className="data-section">
          <h2>Quick Actions</h2>
          <p>📊 Enter Results - Coming Soon</p>
          <p>📝 View Students - Coming Soon</p>
          <p>📧 Send Messages - Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;