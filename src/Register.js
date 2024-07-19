import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { app as firebaseApp } from "./config/firebaseConfig";
import "./styles/LogReg.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://project-management-server-4av5.onrender.com/register",
        {
          email,
          password,
        }
      );

      console.log("Register response:", response.data); // Registration the response to console.

      // Assuming successful registration redirects to homepage
      navigate("/homepage");
    } catch (error) {
      setError(`${error.response.data.error}`); // Handle registration failure
    }
  };

  return (
    <div className="LogReg-container">
      <h2>Register</h2>
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

export default Register;
