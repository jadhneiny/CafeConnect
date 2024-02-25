import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Ensure CSS is consistent with SignUp.css

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement login logic here
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2 className="sign-up-title">Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="form-footer">
          <Link to="/" className="form-link back-home">
            Back to Home
          </Link>
          <Link to="/forgot-password" className="form-link forgot-password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
