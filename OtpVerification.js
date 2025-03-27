import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './OtpVerification.css';

function OTPVerification() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter OTP.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Invalid OTP.");
            }
    
            navigate("/resetpassword", { state: { email } });
    
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Failed to verify OTP.");
        }
    };
    

    return (
        <div className="otp-container">
            <h2>Enter OTP</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
    );
}

export default OTPVerification;
