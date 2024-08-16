import React, { useContext, useState } from "react";
import { AuthContext } from "../authContext";
import axios from "axios";
import "../styles/PersonalArea.css";

const UserDetails = ({ userData }) => {
  const { authData, fetchUserData } = useContext(AuthContext);
  const user = userData || authData?.user;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEditToggle = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://project-management-server-4av5.onrender.com/update-name",
        { firstName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message || "Name updated successfully.");
      await fetchUserData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating name:", error);
      setMessage("There was an error updating your name. Please try again.");
    }
  };

  return (
    <div className="details-section">
      {!userData ? (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <label>
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                value={firstName}
                onChange={handleNameChange}
                required
                style={{ marginLeft: "10px" }}
              />
            ) : (
              <span style={{ marginLeft: "10px" }}>{firstName}</span>
            )}
          </label>
          {isEditing ? (
            <button 
            type="submit" 
            style={{ 
              fontSize: "15px",
              padding: "2px 6px",
              marginLeft: "10px",
              cursor: "pointer",
              border: "none",
              }}>
              Save
            </button>
          ) : (
            <button
              type="edit"
              onClick={handleEditToggle}
              style={{
                fontSize: "15px",
                padding: "2px 6px",
                marginLeft: "10px",
                cursor: "pointer",
                border: "none",
              }}>
              Edit
            </button>
          )}
        </form>
      ) : (
        <p>
          <strong>Name:</strong> {user?.firstName}
        </p>
      )}

      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UserDetails;
