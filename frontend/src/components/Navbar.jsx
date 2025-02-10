import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from backend
    axios.get('http://localhost:5000/api/users/auth', { withCredentials: true })
      .then(response => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch(error => {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("userInfo")
        navigate('/');
      })
      .catch(error => console.error('Logout failed:', error));
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;

     if (selectedOption === 'settings') {
      navigate('/settings');
    } else if (selectedOption === 'logout') {
      handleLogout();
    }
  };

  return (
    <nav className="navbar navbar-light bg-light shadow-sm position-sticky top-0 z-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to='/'>
          <img src="/bootstrap.png" alt="Bootstrap Logo" width="65" height="54" />
        </Link>
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Show Cart */}
              <Link to='/cart'>
                <button className="btn btn-primary text-white rounded-pill px-4 py-2 shadow-sm hover-scale">
                  <ShoppingCart />
                </button>
              </Link>

              {/* Menu */}
              <select 
                className="form-select form-select-lg" 
                aria-label="Select menu" 
                style={{ width: '200px' }} 
                onChange={handleSelectChange}
              >
                <option defaultValue >Menu</option>
                <option value="settings">Settings</option>
                <option value="logout">Logout</option>
              </select>
            </>
          ) : (
            // Show Login button if user is not logged in
            <Link to='/login'>
              <button className="btn btn-success text-white px-4 py-2 rounded-pill">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
