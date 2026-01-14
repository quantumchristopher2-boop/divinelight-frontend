import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📚 Divine Light Schools - Student Portal</h1>
        <div className="user-info">
          <span>👤 {user.full_name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="data-section">
          <h2>Welcome, {user.full_name}!</h2>
          <p>📊 View Results - Coming Soon</p>
          <p>📅 Class Schedule - Coming Soon</p>
          <p>📢 Announcements - Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;