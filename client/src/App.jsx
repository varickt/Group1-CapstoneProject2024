import { Routes, Route, Navigate } from 'react-router-dom';
import Loggedinpage from './components/Loggedinpage';
import SignInPage from './components/SignInPage'; // Import SignInPage

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Redirect to Loggedinpage if the user is logged in, otherwise redirect to SignInPage */}
      <Route 
        path="/" 
        element={isLoggedIn ? <Loggedinpage /> : <Navigate to="/sign-in" />} 
      />
      
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
};

export default App;