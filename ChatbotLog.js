import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (message) => {
    if (message.trim() === '') return;
    
    // Add user message
    const newUserMessage = { text: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');

    // Simulate bot response after 1 second
    setIsBotTyping(true);
    setTimeout(() => {
      const botResponse = { text: "This is a bot response.", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsBotTyping(false);
    }, 1500);
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

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h2>Chatbot</h2>
      </div>

      <div className="chat-display">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}

        {isBotTyping && (
          <div className="message bot typing">
            <div className="message-content">...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={() => sendMessage(input)} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
