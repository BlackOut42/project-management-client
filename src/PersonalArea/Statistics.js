// /src/PersonalArea/Statistics.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PersonalArea.css";
import { AuthContext } from "../authContext";

const Statistics = ({ userData }) => {
  const { authData } = useContext(AuthContext);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      const user = userData || JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `https://project-management-server-4av5.onrender.com/user-statistics/${user.uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [userData]);

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="statistics-section">
      <h3>Statistics</h3>
      {statistics ? (
        <ul>
          <li>Following: {statistics.followingCount}</li>
          <li>Followers: {statistics.followersCount}</li>
          <li>Liked Posts: {statistics.likedPostsCount}</li>
          <li>Bookmarked Posts: {statistics.bookmarkedCount}</li>
          <li>Your Posts: {statistics.postsCount}</li>
        </ul>
      ) : (
        <p>Failed to load statistics.</p>
      )}
    </div>
  );
};

export default Statistics;
