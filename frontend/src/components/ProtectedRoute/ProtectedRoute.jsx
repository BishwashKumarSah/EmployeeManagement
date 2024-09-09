import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until loading is done to check authentication
  if (loading) {
    return <div>Loading...</div>; // Show loading state or a spinner
  }
  console.log("isAuthen",isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
