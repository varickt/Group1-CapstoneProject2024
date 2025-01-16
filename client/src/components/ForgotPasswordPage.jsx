import React, { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar component
import Logo from "/images/Logo.png"; // Adjust path if needed
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to send reset link");
        setLoading(false);
        return;
      }

      setMessage("Password reset link sent to your email!");
      setLoading(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      {/* Navbar at the top */}
      <Navbar />

      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div className="forgot-password-inner-box">
            <img src={Logo} alt="App Logo" className="forgot-password-logo" />
            <h2 className="forgot-password-title">Forgot Password</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="forgot-password-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
