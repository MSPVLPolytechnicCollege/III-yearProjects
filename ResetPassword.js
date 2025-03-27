import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ResetPassword.css';


function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const response = await fetch("http://localhost:5000/api/resetpassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Password successfully reset! Redirecting to login...");
            navigate("/login");
        } else {
            setError(data.message || "Error resetting password.");
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
            <button onClick={handleResetPassword}>Submit</button>
        </div>
    );
}

export default ResetPassword;
