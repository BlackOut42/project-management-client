// /src/PersonalArea.js
import React, { useState } from "react";
import Sidebar from "./PersonalArea/Sidebar";
import UserDetails from "./PersonalArea/UserDetails";
import ChangePassword from "./PersonalArea/ChangePassword";
import DeleteAccount from "./PersonalArea/DeleteAccount";
import LikedPosts from "./PersonalArea/LikedPosts";
import MyPosts from "./PersonalArea/MyPosts";
import Statistics from "./PersonalArea/Statistics";
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
      case "likedPosts":
        return <LikedPosts />;
      case "myPosts":
        return <MyPosts />;
      case "statistics":
        return <Statistics />;
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
