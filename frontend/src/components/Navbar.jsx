import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      
      //     const response = await fetch('https://vexocore.onrender.com/api/auth/logout', {
      //   method: 'GET',
      //   credentials: 'include'
      // });

      if (response.ok) {
        onLogout();
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          <i className="fas fa-tasks me-2"></i>
          Task Manager
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    <i className="fas fa-user me-1"></i>
                    Welcome, {user?.username}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/signup">
                    <i className="fas fa-user-plus me-1"></i>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
