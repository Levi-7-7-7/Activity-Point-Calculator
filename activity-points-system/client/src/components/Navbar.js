import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '15px' }}>🏠 Home</Link>

      {isLoggedIn && role === 'student' && (
        <>
          <Link to="/dashboard" style={{ marginRight: '15px' }}>📊 Dashboard</Link>
          <Link to="/upload" style={{ marginRight: '15px' }}>📁 Upload</Link>
        </>
      )}

      {isLoggedIn && role === 'tutor' && (
        <Link to="/tutor" style={{ marginRight: '15px' }}>🧑‍🏫 Tutor Panel</Link>
      )}

      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ marginLeft: '20px' }}>🚪 Logout</button>
      ) : (
        <>
          <Link to="/" style={{ marginRight: '15px' }}>🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
