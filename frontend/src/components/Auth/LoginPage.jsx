import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // Import the useAuth hook

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from the AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      login(token); // Call the login function from the AuthContext to set the token
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <div className="auth-switch">
        <p>Don't have an account?</p>
        <Link to="/signup" className="auth-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
