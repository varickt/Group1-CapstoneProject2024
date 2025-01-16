import { Routes, Route, Navigate } from "react-router-dom";
import Loggedinpage from "./components/Loggedinpage";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/Homepage";
import Registerpage from "./components/Registerpage";
import ForgotPasswordPage from "./components/ForgotPasswordPage"; // Import the new Forgot Password component
import Layout from "./components/Layout";
import CarDetails from "./components/CarDetails";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

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
            </Layout> // Wrap with Layout
          ) : (
            <Navigate to="/sign-in" />
          )
        }
      />

      {/* Sign-in route */}
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Register route */}
      <Route path="/register" element={<Registerpage />} />

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
