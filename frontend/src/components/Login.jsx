import React, { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general message
    if (message) {
      setMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setMessage('');
    try {
      console.log("Attempting login with:", formData);
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true
      });

      const data = response.data;
      if (response.status === 200) {
        setMessage('Login successful! Redirecting...');
        setFormData({ email: '', password: '' });
        // Update authentication state here if needed
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="card-title fw-bold text-primary mb-2">Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {message && (
                <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                  {message}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMessage('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  disabled={loading}
                  autoComplete="email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label text-muted" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-primary text-decoration-none small">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="d-grid mb-3">
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="text-center mb-3">
                <div className="d-flex align-items-center">
                  <hr className="flex-grow-1" />
                  <span className="px-3 text-muted small">OR</span>
                  <hr className="flex-grow-1" />
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="d-grid gap-2 mb-4">
                <button type="button" className="btn btn-outline-dark">
                  <i className="bi bi-google me-2"></i>
                  Continue with Google
                </button>
                <button type="button" className="btn btn-outline-primary">
                  <i className="bi bi-facebook me-2"></i>
                  Continue with Facebook
                </button>
              </div>

              {/* Signup Link */}
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-primary text-decoration-none fw-semibold">
                    Create one here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;