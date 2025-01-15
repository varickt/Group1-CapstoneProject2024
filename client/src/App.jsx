import { Routes, Route, Navigate } from "react-router-dom";
import Loggedinpage from "./components/Loggedinpage";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/Homepage";
import Registerpage from "./components/Registerpage";
import Layout from "./components/Layout";
const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Use Layout for pages with Navbar */}
      <Route path="/" element={<Layout><Homepage /></Layout>} />

      <Route
        path="/dashboard"
        element={isLoggedIn ? (
          <Layout><Loggedinpage /></Layout> // Wrap with Layout
        ) : (
          <Navigate to="/sign-in" />
        )}
      />

      {/* Sign-in route */}
      <Route path="/sign-in" element={<SignInPage />} />
      
      <Route path="/register" element={<Registerpage />} /> {/* Add RegisterPage route */}

      {/* Redirect all unknown routes to the homepage */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;