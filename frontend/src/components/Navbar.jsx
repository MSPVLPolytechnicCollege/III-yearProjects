import React, { useEffect, useState } from 'react';
import "../index.css";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios'; // For making HTTP requests

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by looking for the JWT token in cookies
    const token = Cookies.get("jwt");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);

      // Make an API request to fetch user details from the backend
      axios.get('http://localhost:5000/api/users/profile', { withCredentials: true })
        .then(response => {
          setUser(response.data); // Store user data in state
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove JWT cookie
    Cookies.remove('jwt');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/'; // Redirect to home page or login page
  };

  return (
    <nav className="navbar navbar-light bg-light shadow-sm position-sticky top-0 z-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to='/'>
          <img src="/bootstrap.png" alt="Bootstrap Logo" width="65" height="54" />
        </Link>
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <Link to='/cart'>
              <button className="btn btn-primary text-white rounded-pill px-4 py-2 shadow-sm hover-scale">
                <ShoppingCart />
              </button>
            </Link>
          )}

          {isLoggedIn && user && (
            <p className="text-info">Welcome, {user.name}</p> // Display user name from JWT payload
          )}

          <select className="form-select form-select-lg" aria-label="Select menu" style={{ width: '200px' }}>
            <option defaultValue>Menu</option>
            <option value="1">Profile</option>
            <option value="2">Settings</option>
            <option value="3" onClick={handleLogout}>Logout</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
