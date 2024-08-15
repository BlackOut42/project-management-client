import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VisitorSidebar from "./PersonalArea/VisitorSidebar";
import UserDetails from "./PersonalArea/UserDetails";
import LikedPosts from "./PersonalArea/LikedPosts";
import MyPosts from "./PersonalArea/MyPosts";
import Statistics from "./PersonalArea/Statistics";
import SavedPosts from "./PersonalArea/SavedPosts";
import FollowedUsers from "./PersonalArea/FollowedUsers";
import "./styles/PersonalArea.css";
import axios from "axios";

const VisitorPersonalArea = () => {
  const { userId } = useParams(); // Use useParams to get userId from the route
  const [selectedPanel, setSelectedPanel] = useState("details");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("hello visitor!");
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://project-management-server-4av5.onrender.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const renderPanel = () => {
    switch (selectedPanel) {
      case "details":
        return <UserDetails userData={userData} />;
      case "Posts":
        return <MyPosts userData={userData} />;
      case "statistics":
        return <Statistics userData={userData} />;
      default:
        return <UserDetails userData={userData} />;
    }
  };

  if (userData) {
    return (
      <div className="personalarea-container">
        <VisitorSidebar onSelectPanel={setSelectedPanel} />
        <div className="panel-container">{renderPanel()}</div>
      </div>
    );
  } else {
    return (
      <div className="error-message">
        User data not found or an error occurred.
      </div>
    );
  }
};

export default VisitorPersonalArea;
