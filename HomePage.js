import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const spinnerRef = useRef(null);
  const rotationRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      document.querySelector('.loading-container').classList.add('hidden');
    }, 1000);

    const interval = setInterval(() => {
      if (spinnerRef.current) {
        spinnerRef.current.style.borderTopColor = getRandomColor();
        rotationRef.current += 5;
        spinnerRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : ''}`}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-animation">
            <div className="spinner" ref={spinnerRef}></div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <header className="home-header">
            <h1>Welcome to PyBot!</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={darkMode ? 'dark-mode' : ''}
            >
              Change Theme
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
              <button className="home-button" onClick={() => navigate('/chatbot')}>
                Continue as Guest
              </button>
            </div>
          </main>

          <footer className="home-footer">
            <p>&copy; {new Date().getFullYear()} Python Chatbot</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default HomePage;
