import React from 'react';
import "../index.css";
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm position-sticky top-0 z-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to='/'>
          <img src="/bootstrap.png" alt="Bootstrap Logo" width="65" height="54" />
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link to='/cart'>
            <button className="btn btn-primary text-white rounded-pill px-4 py-2 shadow-sm hover-scale">
              <ShoppingCart />
            </button>
          </Link>
          <select className="form-select form-select-lg" aria-label="Select menu" style={{ width: '200px' }}>
            <option defaultValue>Menu</option>
            <option value="1">Profile</option>
            <option value="2">Settings</option>
            <option value="3">Logout</option>
         </select>
        </div>
      </div>
    </nav>



  )
}

export default Navbar