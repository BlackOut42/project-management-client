// /src/PersonalArea/MyPosts.js
import React from "react";
import PersonalFeed from "./PersonalFeed";
import "../styles/PersonalArea.css";

const MyPosts = ({ userData }) => {
  const user = userData || JSON.parse(localStorage.getItem("user"));

  return (
    <div className="saved-posts-section post-feed-section">
      <h3>{userData ? `${user.firstName}'s Posts` : "My Posts"}</h3>
      {user ? (
        <PersonalFeed
          fetchRoute={`https://project-management-server-4av5.onrender.com/user-posts/${user.uid}`}
        />
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default MyPosts;
