import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignupForm.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [textColor, setTextColor] = useState('#333'); // Default color
  const navigate = useNavigate();

  // Function to change color every second
  useEffect(() => {
    const colors = ['#ff5733', '#33ff57', '#3357ff', '#f333ff', '#ff5733'];
    let index = 0;

    const interval = setInterval(() => {
      setTextColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSignup = async () => {
    setError('');

    if (!username || !password || !confirmPassword || !email || !age) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, age }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/chatbot');
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="background-container">
      <div className="signup-container">
        <h2 style={{ color: textColor }}>Signup</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="input-group password-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-group password-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="signup-button" onClick={handleSignup}>
          Signup
        </button>

        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default SignupForm;