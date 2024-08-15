// /src/PersonalArea/LikedPosts.js
import React from "react";
import "../styles/PersonalArea.css";
import PersonalFeed from "./PersonalFeed";

const LikedPosts = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="liked-posts-section post-feed-section">
      <h3>Liked Posts</h3>
      {user ? (
        <PersonalFeed
          fetchRoute={`https://project-management-server-4av5.onrender.com/liked-posts/${user.uid}`}
        />
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default LikedPosts;
