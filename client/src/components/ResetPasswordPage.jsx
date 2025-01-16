import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', { email });
      // Inform the user to check their email
      alert('Password reset link sent to your email.');
    } catch (error) {
      // Handle error
      console.error('Password reset request failed:', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetRequest}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
