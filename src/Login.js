import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./authContext";
import "./styles/LogReg.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://project-management-server-4av5.onrender.com/login",
        {
          email,
          password,
        }
      );
      console.log(response.data.user);
      // Save token and user to localStorage
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Update AuthContext with user data
      login({ user: response.data.user, token: response.data.idToken });

      navigate("/homepage");
    } catch (error) {
      console.log(error);
      setError(`${error.response.data.error}`); // Handle login failure
    }
  };

  return (
    <div className="LogReg-container">
      <h2>Login</h2>
      <form className="LogReg-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="LogReg-input"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="LogReg-input"
            required
          />
        </label>
        {error && <p className="LogReg-error">{error}</p>}
        <button type="submit" className="LogReg-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
