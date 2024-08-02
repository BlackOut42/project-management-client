// /src/PersonalArea.js
import React, { useState } from "react";
import Sidebar from "./PersonalArea/Sidebar";
import UserDetails from "./PersonalArea/UserDetails";
import ChangePassword from "./PersonalArea/ChangePassword";
import DeleteAccount from "./PersonalArea/DeleteAccount";
import "./styles/PersonalArea.css";

const PersonalArea = () => {
  const [selectedPanel, setSelectedPanel] = useState("details");

  const renderPanel = () => {
    switch (selectedPanel) {
      case "details":
        return <UserDetails />;
      case "password":
        return <ChangePassword />;
      case "delete":
        return <DeleteAccount />;
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
