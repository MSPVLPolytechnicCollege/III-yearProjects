import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react'; // Import icons
import './HomePage.css';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <header className="home-header">
            <h1>Welcome to PyBot!</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />} {/* Icon changes dynamically */}
            </button>
          </header>

          <main className="home-content">
            <p>
              Dive into the world of Python programming with our intelligent chatbot. Whether you're a beginner or an experienced developer, we're here to assist you with Python syntax, concepts, and best practices.
            </p>

            <div className="home-buttons">
              <button className="home-button" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="home-button" onClick={() => navigate('/signup')}>
                Signup
              </button>
              <button className="home-button" onClick={() => navigate('/chatbotlog')}>
                Continue as Guest
              </button>
            </div>
          </main>

          <footer className="home-footer">
            <p>&copy; {new Date().getFullYear()} MSPVL.IT_Boys.pvt.limited</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default HomePage;
