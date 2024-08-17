// /src/PersonalArea.js
import React, { useState, useContext } from "react";
import { AuthContext } from "./authContext";
import Sidebar from "./PersonalArea/Sidebar";
import PanelContainer from "./PersonalArea/PanelContainer";
import UserDetails from "./PersonalArea/UserDetails";
import ChangePassword from "./PersonalArea/ChangePassword";
import DeleteAccount from "./PersonalArea/DeleteAccount";
import LikedPosts from "./PersonalArea/LikedPosts";
import MyPosts from "./PersonalArea/MyPosts";
import Statistics from "./PersonalArea/Statistics";
import SavedPosts from "./PersonalArea/SavedPosts";
import FollowedUsers from "./PersonalArea/FollowedUsers";
import "./styles/PersonalArea.css";
const PersonalArea = () => {
  const { authData } = useContext(AuthContext);
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
      case "savedPosts":
        return <SavedPosts />;
      case "followedUsers":
        return <FollowedUsers />;
      default:
        return <UserDetails />;
    }
  };

  if (authData) {
    return (
      <div className="personalarea-container">
        <div className="personal-cont">
          <div className="sidebar">
            <Sidebar onSelectPanel={setSelectedPanel} />
          </div>
          <div className="panel-container">
            <PanelContainer renderPanel={renderPanel} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="error-message">
        You are unauthorized to view this page, please log into an existing
        account.
      </div>
    );
  }
};

export default PersonalArea;
