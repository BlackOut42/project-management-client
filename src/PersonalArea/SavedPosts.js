// /src/PersonalArea/SavedPosts.js
import React from "react";
import PersonalFeed from "./PersonalFeed";
import "../styles/PersonalArea.css";

const SavedPosts = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="saved-posts-section post-feed-section">
      <h3>My Bookmarks</h3>
      {user ? (
        <PersonalFeed
          fetchRoute={`https://project-management-server-4av5.onrender.com/bookmarked-posts/${user.uid}`}
        />
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
};

export default SavedPosts;
