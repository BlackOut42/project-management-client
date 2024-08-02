// /src/PersonalArea/ChangePassword.js
import React from "react";
import "../styles/PersonalArea.css";

const ChangePassword = () => {
  return (
    <div className="password-section">
      <h3>Change Password</h3>
      <form>
        <label>
          Current Password:
          <input type="password" name="currentPassword" />
        </label>
        <label>
          New Password:
          <input type="password" name="newPassword" />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
