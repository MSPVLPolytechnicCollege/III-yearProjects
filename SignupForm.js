import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(''); // Clear previous errors

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
        navigate('/chatbot'); // Redirect to Chatbot page after signup
      } else {
        setError(data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>

      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>
    </div>
  );
}

export default SignupForm;
