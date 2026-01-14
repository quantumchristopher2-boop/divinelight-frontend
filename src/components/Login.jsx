import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      const { token, user } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      const roleRoutes = {
        super_admin: '/admin',
        admin: '/admin',
        teacher: '/teacher',
        student: '/student',
        parent: '/parent',
      };

      navigate(roleRoutes[user.role] || '/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🏫 {process.env.REACT_APP_SCHOOL_NAME || 'Divine Light Schools'}</h1>
          <p>School Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer credentials should come from environment variables if used for demo */}
        <div className="login-footer">
          <p>Default Admin Login (for demo purposes only):</p>
          <p>Email: {process.env.REACT_APP_ADMIN_EMAIL_1 || 'quantumchristopher2@gmail.com'}</p>
          <p>Password: {process.env.REACT_APP_ADMIN_PASSWORD || 'DivineAdmin2025'}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;