import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpVerification() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleOtpVerification = async () => {
        setError('');

        try {
            const response = await fetch('/api/otpverification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp })
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/resetpassword');
            } else {
                setError(data.message || 'Invalid OTP. Try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="otp-verification-container">
            <h2>Enter OTP</h2>
            {error && <p className="error-message">{error}</p>}
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleOtpVerification}>Verify OTP</button>
        </div>
    );
}

export default OtpVerification;
