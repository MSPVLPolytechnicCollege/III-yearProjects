import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import Chatbot from './Chatbot';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import SignupForm from './SignupForm';
import ChatbotLog from './ChatbotLog';
import OtpVerification from './OtpVerification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/chatbotlog" element={<ChatbotLog />} />
        <Route path="/otpverification" element={<OtpVerification />} />
      </Routes>
    </Router>
  );
}

export default App;
