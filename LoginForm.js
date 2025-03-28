import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/chatbot'); // Redirect to Chatbot page after login
      } else {
        setError(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="background-container">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group password-group">
          <b><label htmlFor="password">Password</label></b>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <button className="forgot-password-button" onClick={() => navigate('/forgotpassword')}>
          Forgot Password?
        </button>

        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default LoginForm;