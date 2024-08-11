// /src/PersonalArea/Sidebar.js
import React from "react";
import "../styles/PersonalArea.css";

const Sidebar = ({ onSelectPanel }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => onSelectPanel("details")}>Your Details</li>
        <li onClick={() => onSelectPanel("password")}>Change Password</li>
        <li onClick={() => onSelectPanel("myPosts")}>My Posts</li>
        <li onClick={() => onSelectPanel("likedPosts")}>Liked Posts</li>
        <li onClick={() => onSelectPanel("statistics")}>Statistics</li>
        <li onClick={() => onSelectPanel("savedPosts")}>Saved Posts</li>
        <li onClick={() => onSelectPanel("followedUsers")}>Followed Users</li>
        <li onClick={() => onSelectPanel("delete")}>Delete Account</li>
      </ul>
    </div>
  );
};

export default Sidebar;
