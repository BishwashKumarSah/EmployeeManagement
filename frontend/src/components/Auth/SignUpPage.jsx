import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Import the AuthContext
import axios from "axios";
import "./Auth.css"; // Import the CSS file

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login method from AuthContext

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { email, password }
      );
      login(response.data.token); // Use the login method from AuthContext to save the token and set authenticated state
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">Sign Up</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSignup} className="auth-form">
        <div className="form-group">
          <label htmlFor="signup-email">Email:</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password:</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <div className="auth-switch">
        <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
