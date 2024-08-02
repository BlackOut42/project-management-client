// /src/PersonalArea/Sidebar.js
import React from "react";
import "../styles/PersonalArea.css";

const Sidebar = ({ onSelectPanel }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelectPanel("details")}>Your Details</li>
        <li onClick={() => onSelectPanel("password")}>Change Password</li>
      </ul>
    </div>
  );
};

export default Sidebar;
