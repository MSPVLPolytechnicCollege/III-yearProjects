import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot({ isLoggedIn, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
      sendMessage(voiceInput);
    };

    recognition.onerror = (event) => {
      console.error('Voice input error:', event);
    };
  };

  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    const newUserMessage = { text: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();
      const botResponse = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'An error occurred. Please try again.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="back-button" onClick={onBack}>Back</button> {/* Add Back Button */}
      
      <div className="chat-display" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
        {isLoading && <div className="loading-indicator">Thinking...</div>}
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="chat-input"
        />
        {isLoggedIn && (
          <button onClick={handleVoiceInput} className="voice-button">
            🎤
          </button>
        )}
        <button onClick={() => sendMessage(input)} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
