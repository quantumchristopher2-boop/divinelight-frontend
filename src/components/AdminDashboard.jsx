import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, getClasses, createStudent, createClass, getCurrentSessionTerm } from '../utils/api';
import './Dashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsRes, classesRes, currentRes] = await Promise.all([
        getStudents(),
        getClasses(),
        getCurrentSessionTerm()
      ]);

      setStudents(studentsRes.data);
      setClasses(classesRes.data);
      setCurrentSession(currentRes.data.session);
      setCurrentTerm(currentRes.data.term);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const renderOverview = () => (
    <div className="overview-grid">
      <div className="stat-card">
        <h3>Total Students</h3>
        <p className="stat-number">{students.length}</p>
      </div>
      <div className="stat-card">
        <h3>Total Classes</h3>
        <p className="stat-number">{classes.length}</p>
      </div>
      <div className="stat-card">
        <h3>Current Session</h3>
        <p className="stat-number">{currentSession?.name || 'N/A'}</p>
      </div>
      <div className="stat-card">
        <h3>Current Term</h3>
        <p className="stat-number">{currentTerm?.name || 'N/A'}</p>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="data-section">
      <div className="section-header">
        <h2>Students</h2>
        <button className="btn-primary" onClick={() => alert('Add Student Form - Coming Soon!')}>
          + Add Student
        </button>
      </div>
      
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Admission No.</th>
                <th>Full Name</th>
                <th>Class</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.admission_number}</td>
                  <td>{student.user?.full_name || 'N/A'}</td>
                  <td>{student.class?.name || 'N/A'}</td>
                  <td>{student.user?.email || 'N/A'}</td>
                  <td>{student.user?.phone || 'N/A'}</td>
                  <td>
                    <button className="btn-small">View</button>
                    <button className="btn-small">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderClasses = () => (
    <div className="data-section">
      <div className="section-header">
        <h2>Classes</h2>
        <button className="btn-primary" onClick={() => alert('Add Class Form - Coming Soon!')}>
          + Add Class
        </button>
      </div>
      
      <div className="class-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="class-card">
            <h3>{cls.name}</h3>
            <p>Level: {cls.level}</p>
            <p>Grade: {cls.grade_number}</p>
            <p>Capacity: {cls.capacity}</p>
            <button className="btn-small">Manage</button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏫 Divine Light Schools - Admin Panel</h1>
        <div className="user-info">
          <span>👤 {user.full_name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button 
          className={activeTab === 'classes' ? 'active' : ''} 
          onClick={() => setActiveTab('classes')}
        >
          Classes
        </button>
        <button 
          className={activeTab === 'results' ? 'active' : ''} 
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'classes' && renderClasses()}
        {activeTab === 'results' && <p>Results Management - Coming Soon!</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;