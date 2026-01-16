import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const changePassword = (oldPassword, newPassword) => api.post('/auth/change-password', { oldPassword, newPassword });

// Current session/term
export const getCurrentSessionTerm = () => api.get('/current');

// Students
export const getStudents = (params) => api.get('/students', { params });
export const getStudent = (id) => api.get(`/students/${id}`);
export const createStudent = (data) => api.post('/students', data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);

// Classes
export const getClasses = () => api.get('/classes');
export const createClass = (data) => api.post('/classes', data);

// Subjects
export const getSubjects = () => api.get('/subjects');

// Results
export const getResults = (params) => api.get('/results', { params });
export const batchUpdateResults = (results) => api.post('/results/batch', { results });
export const publishResults = (data) => api.post('/results/publish', data);

// Messages
export const getMessages = () => api.get('/messages');
export const sendMessage = (data) => api.post('/messages', data);

// Announcements
export const getAnnouncements = () => api.get('/announcements');
export const createAnnouncement = (data) => api.post('/announcements', data);

export default api;