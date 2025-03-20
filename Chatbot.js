import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic } from 'lucide-react';
import './Chatbot.css';

function Chatbot({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  // Function to speak text aloud
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    const newUserMessage = { text: message, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setShowLightning(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowLightning(false);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();
      const botResponse = { text: data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botResponse]);

      // Speak the bot response
      speakText(data.response);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'An error occurred. Please try again.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      speakText('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} /> Back
        </button>
        <span>PyBot</span>
      </div>

      <div className="chat-display" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}

        {showLightning && <div className="lightning-effect"></div>}

        {isLoading && <div className="loading-indicator">...Thinking</div>}
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="chat-input"
        />
        <button onClick={() => sendMessage(input)} className="send-button">
          <Send size={20} />
        </button>
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          className={`mic-button ${isRecording ? 'recording' : ''}`}
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
