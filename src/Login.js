import React, { useState } from "react";
import "./Login.css"; // Import your Login-specific CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one special character, and one capital letter."
      );
      return;
    }

    // If validation passes
    setError("");
    console.log("Username:", username);
    console.log("Password:", password);

    // Proceed with login logic
  };

  return (
    <div className="login-container">
      <h2>Login</h2> {/* Header is placed above the form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
