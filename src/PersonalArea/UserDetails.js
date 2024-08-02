// /src/PersonalArea/UserDetails.js
import React, { useContext } from "react";
import { AuthContext } from "../authContext";
import "../styles/PersonalArea.css";

const UserDetails = () => {
  const { authData } = useContext(AuthContext);
  const user = authData?.user;

  return (
    <div className="details-section">
      <h3>Your Details</h3>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
    </div>
  );
};

export default UserDetails;
