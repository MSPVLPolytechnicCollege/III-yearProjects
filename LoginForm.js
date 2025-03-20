import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" onClick={handleLogin}>
        Login
      </button>

      <button className="forgot-password-button" onClick={() => navigate('/forgot-password')}>
        Forgot Password?
      </button>

      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
}

export default LoginForm;
