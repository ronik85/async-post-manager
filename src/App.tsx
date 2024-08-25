// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PostManagement from './components/PostManagement';
import ProtectedRoute from './components/ProtectedRoute';
import './components/style.css'

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/post-management"
          element={<ProtectedRoute element={<PostManagement />} />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/post-management" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
