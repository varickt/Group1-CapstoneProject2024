import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/sign-in"); // Navigate to Sign In page
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to Register page
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Car Judge</h1>
        <p>Your go-to destination for honest car reviews and ratings.</p>
        <p>Please sign in to view cars and reviews. Don't have an account? Register!</p>
        <div className="cta-buttons">
          <button className="btn primary" onClick={handleSignInClick}>
            Sign In
          </button>
          <button className="btn secondary" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </header>
    </div>
  );
};

export default Homepage;