import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loggedinpage from "./components/Loggedinpage";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/Homepage";
import Registerpage from "./components/Registerpage";
import ForgotPasswordPage from "./components/ForgotPasswordPage"; // Import the new Forgot Password component
import Layout from "./components/Layout";
import CarDetails from "./components/CarDetails";

const App = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });

<<<<<<< HEAD
=======
  // Define `isLoggedIn` based on the `token`
  const isLoggedIn = !!token;

>>>>>>> 8de0e67f7f766c01498a9df2100cbca3fc2679e7
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
<<<<<<< HEAD
  }, [token]); // Corrected to an array

  const isLoggedIn = !!token; // Define isLoggedIn
=======
  }, [token]);
>>>>>>> 8de0e67f7f766c01498a9df2100cbca3fc2679e7

  return (
    <Routes>
      {/* Use Layout for pages with Navbar */}
      <Route
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />

      {/* Dashboard route (protected) */}
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

      {/* Sign-in route */}
      <Route
  path="/sign-in"
  element={<SignInPage setToken={setToken} />}
/>

      {/* Register route */}
      <Route
        path="/register"
        element={<Registerpage token={token} setToken={setToken} />}
      />

      {/* Forgot Password route */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Car Details route */}
      <Route path="/car-details/:carId" element={<CarDetails />} />

      {/* Redirect all unknown routes to the homepage */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;