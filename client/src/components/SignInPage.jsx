import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import Logo from "/images/Logo.png"; // Adjust path if needed
import "./SignInPage.css";

const SignInPage = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" }); // Updated "email" to "identifier"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }
    try {
      console.log("Sign-in successful:", formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="signin-page">
      {/* Navbar at the top */}
      <Navbar />

      <div className="signin-container">
        <div className="signin-box">
          <div className="signin-inner-box">
            <img src={Logo} alt="App Logo" className="signin-logo" />
            <h2 className="signin-title">Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="identifier">Email or Username</label>
                <input
                  type="text" // Changed type from "email" to "text" to allow both email and username
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="Enter your email or username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>
            <p className="forgot-password">
              Forgot your password?{" "}
              <span
                onClick={() => navigate("/forgot-password")}
                className="forgot-password-link"
              >
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
