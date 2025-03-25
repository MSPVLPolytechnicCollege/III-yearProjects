import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

function ChatbotLog() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [theme, setTheme] = useState('light'); // ✅ Theme state
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const navigate = useNavigate();

  // Auto-scroll when messages update ✅
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Speech Recognition Setup (Tamil & English)
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'ta-IN,en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = async (event) => {
        let transcript = event.results[0][0].transcript;

        // Translate Tamil to English
        if (/[\u0B80-\u0BFF]/.test(transcript)) {
          try {
            const response = await fetch(
              `https://api.mymemory.translated.net/get?q=${encodeURIComponent(transcript)}&langpair=ta|en`
            );
            const data = await response.json();
            transcript = data.responseData.translatedText;
          } catch (error) {
            console.error('Translation error:', error);
          }
        }

        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);


  const speakText = (text) => {
    synthRef.current.cancel(); // Stop ongoing speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      synthRef.current.speak(utterance);
    }
  };

  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    setShowLightning(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });

      const data = await response.json();
      const botResponse = { text: data.response, sender: 'bot' };
      setMessages((prev) => [...prev, botResponse]);

      speakText(data.response);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'An error occurred. Please try again.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
      speakText('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setShowLightning(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault(); // Prevent new line
      sendMessage(input);
    }
  };

  // Toggle Light/Dark Theme ✅
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`chatbot-container ${theme}`}>
      <div className="chat-header">
        <button className="back-button-chat" onClick={() => {
          synthRef.current.cancel();
          navigate('/');
        }}>
          <ArrowLeft size={20} /> Back
        </button>
        <span>PyBot</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
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
          placeholder="Type your question... (Shift + Enter to send)"
          className="chat-input"
        />
        <button onClick={() => sendMessage(input)} className="send-button">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatbotLog;
