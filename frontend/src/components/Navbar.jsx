import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:5000/api/users/auth', { withCredentials: true })
      .then(response => {
        setIsLoggedIn(response.data.isLoggedIn);
        setIsAdmin(response.data.user?.isAdmin || false);
        // console.log(response);
      })
      .catch(error => {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      });



      // get cart count
      axios.get("http://localhost:5000/api/cart", { withCredentials: true })
      .then(response => {
        setCartCount(response.data.cartItems.length || 0);  // Assuming response is an array of cart items
        // console.log(response.data.cartItems.length);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
      });


  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem("userInfo");
        navigate('/');
      })
      .catch(error => console.error('Logout failed:', error));
    toast.success("Logged Out Successful !!");
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
              {/* Show Admin Panel button if user is admin */}
              {isAdmin && (
                <Link to='/admin'>
                  <button className="btn btn-warning text-dark rounded-pill px-4 py-2 shadow-sm">
                    Admin Panel
                  </button>
                </Link>
              )}

              {/* Show Cart with item count */}
              <div className='position-relative'>
                <Link to='/cart'>
                  <button className="btn btn-primary text-white rounded-pill px-4 py-2 shadow-sm hover-scale">
                    <ShoppingCart />
                  </button>
                  {cartCount > 0 && (
                    <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>


              {/* Menu */}
              <select 
                className="form-select form-select-lg mx-4" 
                aria-label="Select menu" 
                style={{ width: '200px' }} 
                onChange={handleSelectChange}
              >
                <option defaultValue>Menu</option>
                <option value="settings">Settings</option>
                <option value="logout">Logout</option>
              </select>
            </>
          ) : (
            <Link to='/login'>
              <button className="btn btn-primary text-white px-4 py-2 rounded-pill fw-semibold">
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
