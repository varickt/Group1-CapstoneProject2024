import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loggedinpage from "./components/Loggedinpage";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/Homepage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import Layout from "./components/Layout";
import CarDetails from "./components/CarDetails";
import About from "./components/About"; // Import the About component

const App = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Layout>
              <Loggedinpage />
            </Layout>
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />
      <Route path="/sign-in" element={<SignInPage setToken={setToken} />} />
      <Route path="/register" element={<RegisterPage setToken={setToken} />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/car-details/:carId"
        element={<CarDetails token={token} />}
      />
      <Route path="/about" element={<About />} /> {/* Add the About route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
