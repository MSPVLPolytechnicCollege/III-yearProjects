import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleVerify = async () => {
        setError('');

        const response = await fetch('/api/verify-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        });

        const data = await response.json();

        if (response.ok) {
            navigate('/reset-password', { state: { username } }); // ✅ Pass username to ResetPassword.js
        } else {
            setError(data.message || 'User verification failed. Try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {error && <p className="error-message">{error}</p>}
            <input 
                type="text" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button onClick={handleVerify} className="verify-button">Verify</button>
            <button onClick={() => navigate('/login')} className="back-button">Back</button>
        </div>
    );
}

export default ForgotPassword;
