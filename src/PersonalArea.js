// /src/PersonalArea.js
import React, { useState } from "react";
import Sidebar from "./PersonalArea/Sidebar";
import UserDetails from "./PersonalArea/UserDetails";
import "./styles/PersonalArea.css";

const PersonalArea = () => {
  const [selectedPanel, setSelectedPanel] = useState("details");

  const renderPanel = () => {
    switch (selectedPanel) {
      case "details":
        return <UserDetails />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="personalarea-container">
      <Sidebar onSelectPanel={setSelectedPanel} />
      <div className="panel-container">
        {renderPanel()}
      </div>
    </div>
  );
};

export default PersonalArea;
