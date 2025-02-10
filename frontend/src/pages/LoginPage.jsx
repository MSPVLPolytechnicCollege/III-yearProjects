import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();  // Prevent form from reloading the page

    const params = { email, password }; // Collect form data

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", params, {
        withCredentials: true,
      });
      console.log("Login successful:", response.data);
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-info-subtle" style={{height:"100vh"}}>
      <div className="bg-white p-5 rounded shadow-lg" style={{width: "100%", maxWidth: "500px"}}>
        <h2 className='fw-semibold text-center mb-4'>Login Page</h2>

        {/* Email */}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
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
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>

          {/* Sign In Button */}
          <button type="submit" className='btn btn-primary w-100 fw-semibold mb-3'>Login</button>
        </form>

        {/* Link to Register Page */}
        <Link to='/register'>
          <p className='text-center text-decoration-underline text-primary cursor-pointer'>
            Don't have an account? Click here to Register
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
