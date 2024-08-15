// /src/PersonalArea/FollowedUsers.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/PersonalArea.css";

const MyFollowing = () => {
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      // Get the following list from the user data in local storage
      const followingIds = user.following || [];

      try {
        // Fetch detailed data for each followed user by their ID
        const userDetailsRequests = followingIds.map((id) =>
          axios.get(
            `https://project-management-server-4av5.onrender.com/user/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        // Resolve all requests and extract user data
        const userDetailsResponses = await Promise.all(userDetailsRequests);
        const usersData = userDetailsResponses.map((res) => res.data);

        setFollowingUsers(usersData);
      } catch (error) {
        console.error("Error fetching followed users' details:", error);
      }
    };

    fetchFollowingUsers();
  }, []);

  return (
    <div className="followed-users-section">
      <h3>Followed Users</h3>
      <ul>
        {followingUsers.map((user) => (
          <li key={user.uid}>
            {user.firstName}{" "}
            <Link to={`/personalarea/${user.uid}`}> Personal Page</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFollowing;
