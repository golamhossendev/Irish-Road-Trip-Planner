import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Replace this with your actual auth logic 
  // (e.g., checking localStorage for a token or using a Firebase user)
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  if (!isAuthenticated) {
    // If not logged in, redirect to Home or a Login page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;