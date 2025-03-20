// BeginnerPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BeginnerPage() {
  const navigate = useNavigate(); // Initialize navigate

  const handleNext = () => {
    navigate('/chat'); // Navigate to the chat page
  };

  return (
    <div className="beginner-page">
      <h2>Python Basics</h2>
      <p>
        Python is a versatile and easy-to-learn programming language. Here are some basic concepts:
      </p>
      <ul>
        <li><strong>Variables:</strong> Used to store data.</li>
        <li><strong>Data Types:</strong> Integers, floats, strings, booleans.</li>
        <li><strong>Control Flow:</strong> If statements, loops.</li>
        <li><strong>Functions:</strong> Reusable blocks of code.</li>
      </ul>
      <p>
        Example:
      </p>
      <pre>
        <code>
          x = 10
          print("Hello, Python!")
          if x &gt 5:
            print("x is greater than 5")
        </code>
      </pre>
      <button onClick={handleNext}>Next: Chat</button>
    </div>
  );
}

export default BeginnerPage;