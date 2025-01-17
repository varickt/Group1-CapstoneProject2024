import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, such as sending the data to a server
    setSuccess(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Support</h1>
        <p>If you have any issues, please email us using the form below.</p>
        {success ? (
          <p className="success-message">Your message has been sent successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="form-input"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;