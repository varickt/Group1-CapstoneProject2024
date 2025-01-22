import React from "react";
import Navbar from "./Navbar"; // Import Navbar component
import "./ManageAccount.css"; // Import CSS for styling
const ManageAccount = () => {
  return (
    <div className="manage-account-page">
      {/* Navbar remains at the top */}
      <Navbar />
      {/* Account management section */}
      <section className="account-section">
        <h1>Manage Your Account</h1>
        <div className="account-details">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="account-details">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="account-details">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className="update-button">Update Account</button>
      </section>
    </div>
  );
};
export default ManageAccount;