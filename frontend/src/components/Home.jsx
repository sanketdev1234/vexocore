import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
const Home = () => {
  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-lg border-0 fade-in">
                    <div className="card-header bg-dark text-white text-center py-4">
                      <h2 className="mb-0 fw-bold">
                        <i className="fas fa-tasks me-3"></i>
                        Task Manager
                      </h2>
                    </div>
                    <div className="card-body p-4 p-md-5">
                      <h4 className="text-dark mb-3 text-center fw-bold">Welcome to Task Manager</h4>
                      <p className="text-muted mb-4 text-center">
                        Organize your tasks efficiently with our powerful task management system.
                        Sign up or log in to get started.
                      </p>
                      <div className="d-grid gap-3">
                        <Link to="/login" className="btn btn-dark btn-lg fw-bold">
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline-dark btn-lg fw-bold">
                          <i className="fas fa-user-plus me-2"></i>
                          Sign Up
                        </Link>
                      </div>
                      
                      {/* Features Section */}
                      <div className="row mt-5 pt-4 border-top">
                        <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
                          <div className="p-3">
                            <i className="fas fa-tasks fa-2x text-dark mb-3"></i>
                            <h6 className="text-dark fw-bold">Task Management</h6>
                            <small className="text-muted">Create, edit, and organize tasks</small>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
                          <div className="p-3">
                            <i className="fas fa-chart-line fa-2x text-dark mb-3"></i>
                            <h6 className="text-dark fw-bold">Progress Tracking</h6>
                            <small className="text-muted">Monitor your productivity</small>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 text-center">
                          <div className="p-3">
                            <i className="fas fa-mobile-alt fa-2x text-dark mb-3"></i>
                            <h6 className="text-dark fw-bold">Responsive Design</h6>
                            <small className="text-muted">Works on all devices</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Home;
