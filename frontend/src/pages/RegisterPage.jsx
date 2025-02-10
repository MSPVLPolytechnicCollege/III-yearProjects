import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
      });
      
      if (response.status === 201) {
        await navigate("/login");
        
        toast.success("Registered Successfull!")
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-info-subtle" style={{ height: "100vh" }}>
      <div className="bg-white p-5 rounded shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="fw-semibold text-center mb-4">Register Page</h2>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Sign Up Button */}
        <button className="btn btn-primary w-100 fw-semibold mb-3" onClick={handleSubmit}>Register</button>

        {/* Link to Login Page */}
        <Link to="/login">
          <p className="text-center text-decoration-underline text-primary cursor-pointer">
            Already have an account? Click here to login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
