// /src/PersonalArea/DeleteAccount.js
import React from "react";
import axios from "axios";
import "../styles/PersonalArea.css";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

        // Send a DELETE request to the backend to delete the account
        const response = await axios.delete(
          "https://project-management-server-4av5.onrender.com/delete-account",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        // Redirect the user to the homepage or login page after account deletion
        window.location.href = "/login";
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("There was an error deleting your account. Please try again.");
      }
    }
  };

  return (
    <div className="delete-section">
      <h3>Delete Account</h3>
      <button className="delete-button" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
