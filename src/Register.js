import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import axios from "axios";
import "./styles/LogReg.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(firstName);
      const response = await axios.post(
        "https://project-management-server-4av5.onrender.com/register",
        {
          email,
          password,
          firstName,
        }
      );

      // Save token and user to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Update AuthContext with user data
      login({ user: response.data.user, token: response.data.token });

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
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="LogReg-input"
            required
          />
        </label>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
