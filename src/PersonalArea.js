import React, { useContext } from "react";
import { AuthContext } from "./authContext";
import "./styles/PersonalArea.css";

const PersonalArea = () => {
  const { authData } = useContext(AuthContext);
  const user = authData?.user;

  return (
    <div className="personalarea-container">
      <div className="greeting-section">
        <h2>Personal Area</h2>
      </div>
    </div>
  );
};

export default PersonalArea;
