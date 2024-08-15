// /src/PersonalArea/Sidebar.js
import React from "react";
import "../styles/PersonalArea.css";

const VisitorSidebar = ({ onSelectPanel }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelectPanel("details")}>User Details</li>
        <li onClick={() => onSelectPanel("Posts")}>Posts</li>
        <li onClick={() => onSelectPanel("statistics")}>Statistics</li>
      </ul>
    </div>
  );
};

export default VisitorSidebar;
