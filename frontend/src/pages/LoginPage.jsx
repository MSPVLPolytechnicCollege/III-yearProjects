import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password }, { withCredentials: true });

      localStorage.setItem("userInfo", JSON.stringify(data));

      
      await navigate("/");

      toast.success("Login Successful !!")

      setTimeout(() => {
        window.location.reload();  
      }, 5000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-info-subtle" style={{ height: "100vh" }}>
      <div className="bg-white p-5 rounded shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="fw-semibold text-center mb-4">Login Page</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 fw-semibold mb-3">Login</button>
        </form>

        {/* Register Link */}
        <Link to="/register">
          <p className="text-center text-decoration-underline text-primary cursor-pointer">
            Don't have an account? Click here to Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
