import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import your updated CSS

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleVerify = async () => {
        setError(''); // Clear any previous errors

        if (!username || !email) {
            setError('Please fill in both fields.');
            return;
        }

        try {
            const response = await fetch('/api/forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/verifyotp', { state: { username } }); // Pass username to ResetPassword page
            } else {
                setError(data.message || 'User verification failed. Try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h2>Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}
                
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <button onClick={handleVerify} className="verify-button">Verify</button>
                <button onClick={() => navigate('/login')} className="back-button">Back</button>
            </div>
        </div>
    );
}

export default ForgotPassword;