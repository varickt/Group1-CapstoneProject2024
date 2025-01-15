import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignInPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailOrUsername,  // Pass email if using email, otherwise pass username
          username: emailOrUsername, // In case user enters username
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        setLoading(false);
        return;
      }
  
      const data = await response.json();
  
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
  
      // Redirect to the dashboard (Loggedinpage)
      navigate("/dashboard");  // Navigate to /dashboard after successful login
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Username</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter email or username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;