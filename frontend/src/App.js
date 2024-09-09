import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignUpPage';
import TableComponent from './components/Table/Table';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); 
  return !isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
          <Route path="/signup" element={<PublicRoute element={<SignupPage />} />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<TableComponent />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
