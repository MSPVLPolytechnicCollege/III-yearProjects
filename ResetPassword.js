import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username; // ✅ Get username from navigation state

    const handleResetPassword = async () => {
        setError('');

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Password successfully reset! Redirecting to login...');
            navigate('/login'); // ✅ Redirect to Login page
        } else {
            setError(data.message || 'Error resetting password. Try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {error && <p className="error-message">{error}</p>}
            <input 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Confirm new password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button onClick={handleResetPassword} className="reset-button">Submit</button>
            <button onClick={() => navigate('/login')} className="back-button">Back to Login</button>
        </div>
    );
}

export default ResetPassword;
