import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Menu, LogOut, Settings, Sun, Moon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const chatContainerRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const navigate = useNavigate();
    const [showSettingsOptions, setShowSettingsOptions] = useState(false);
    const [showThemeOptions, setShowThemeOptions] = useState(false); // State for theme options visibility


    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'ta-IN,en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = async (event) => {
                let transcript = event.results[0][0].transcript;

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

            recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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

    const speakText = (text) => {
        synthRef.current.cancel();
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            synthRef.current.speak(utterance);
        }
    };

    

    const formatResponse = (response) => {
      // Remove redundant information
      response = response.replace(/\s{2,}/g, ' ').trim();
    
      // Standardize sentence end (add a period if missing)
      if (!response.endsWith('.') && !response.endsWith('!')) {
        response += '.';
      }
    
      // Add friendly user engagement
      if (!response.includes('Thank you') && !response.includes('You’re welcome')) {
        response += ' Thank you for your question!';
      }
    
      return response;
    };

    const sendMessage = async (message) => {
      if (message.trim() === '') return;
    
      setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
      setInput('');
      setIsLoading(true);
    
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: message }),
        });
    
        const data = await response.json();
    
        // Standardize response formatting here
        let botResponse = data.response.trim();
    
        // Apply basic formatting rules to make it more like ChatGPT
        botResponse = formatResponse(botResponse);
    
        const botReply = { text: botResponse, sender: 'bot' };
        setMessages((prev) => [...prev, botReply]);
        speakText(botResponse);
    
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = { text: 'An error occurred. Please try again.', sender: 'bot' };
        setMessages((prev) => [...prev, errorMessage]);
        speakText('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    const handleKeyDown = (event) => {
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            sendMessage(input);
        }
    };



    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
        setShowSettingsOptions(false); // Close settings options when menu is toggled
        setShowThemeOptions(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleSettingsClick = () => {
        setShowSettingsOptions(!showSettingsOptions);
        setShowThemeOptions(false);
    };

    const clearChatHistory = () => {
        setMessages([]);
        // You can also clear the history from your backend/database if needed.
    };

    const handleThemeClick = () => {
        setShowThemeOptions(!showThemeOptions);
    };


    return (
        <div className={`chatbot-container ${darkMode ? 'dark' : ''}`}>
            {/* Header */}
            <div className="chat-header">
                <button className="back-button-chat" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} /> Back
                </button>
                <span>PyBot</span>

                {/* Header Buttons */}
                <div className="header-buttons">


                    {/* Menu Button (3 dots) */}
                    <button className="menu-button" onClick={toggleMenu}>
                        <Menu size={20} />
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="menu-dropdown">
                            <button className="menu-item" onClick={handleSettingsClick}>
                                <Settings size={18} /> Settings
                            </button>
                            {showSettingsOptions && (
                                <div className="settings-options">
                                    <button className="settings-option" onClick={handleThemeClick}>
                                        Theme
                                    </button>
                                    {showThemeOptions && (
                                        <div className="theme-options">
                                            <button className="theme-option" onClick={() => { setDarkMode(false); localStorage.setItem('theme', 'light'); setShowThemeOptions(false); }}>
                                                <Sun size={16} /> White
                                            </button>
                                            <button className="theme-option" onClick={() => { setDarkMode(true); localStorage.setItem('theme', 'dark'); setShowThemeOptions(false); }}>
                                                <Moon size={16} /> Dark
                                            </button>
                                        </div>
                                    )}
                                    <button className="settings-option" onClick={clearChatHistory}>
                                        <Clock size={16}/> History
                                    </button>
                                    <button className="settings-option" onClick={clearChatHistory}>Delete History</button>
                                </div>
                            )}
                            <button className="menu-item" onClick={handleLogout}>
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Display */}
            <div className="chat-display" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <div className="message-content">{message.text}</div>
                    </div>
                ))}
                {isLoading && <div className="loading-indicator">...Thinking</div>}
            </div>

            {/* Input Area */}
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
