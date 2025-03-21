import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

function Chatbot({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'ta-IN'; // Tamil language
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = async (event) => {
        const tamilText = event.results[0][0].transcript;
        console.log("Recognized Tamil:", tamilText);

        // Translate Tamil to English
        const translatedText = await translateTamilToEnglish(tamilText);
        console.log("Translated English:", translatedText);

        setInput(translatedText); // Set translated English text in the input field
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // ✅ Function to translate Tamil text to English
  const translateTamilToEnglish = async (text) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ta|en`
      );
      const data = await response.json();

      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        console.error("Translation failed:", data);
        return text; // If translation fails, return the original Tamil text
      }
    } catch (error) {
      console.error('Translation API error:', error);
      return text; // If an error occurs, return the original Tamil text
    }
  };

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

  // ✅ Function to make the bot speak
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
        <button className="back-button" onClick={() => navigate('/')}>
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
