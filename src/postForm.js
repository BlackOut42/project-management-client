import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import "./styles/PostForm.css";

const PostForm = () => {
  const { authData } = useContext(AuthContext);
  const [isFormVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the UID and token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const uid = user ? user.uid : null;

    if (!uid) {
      setError("Error: User ID not found.");
      return;
    }

    if (!token) {
      setError("Error: Authorization token not found.");
      return;
    }

    try {
      // Send the post request to the server
      const response = await axios.post(
        "https://project-management-server-4av5.onrender.com/create-post",
        {
          title: title,
          body: body,
          author: localStorage.getItem("user"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        }
      );

      // Handle the response
      console.log(response.data);
      // Reset form fields
      setTitle("");
      setBody("");
      setFormVisible(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(
        error.response
          ? error.response.data.error
          : "Unexpected error occurred."
      );
    }
  };

  if (!authData) {
    return null; // Don't render anything if the user is not logged in
  }

  return (
    <div className="PostForm-container">
      <button onClick={toggleFormVisibility} className="PostForm-button">
        {isFormVisible ? "Cancel" : "Create Post"}
      </button>
      <div className={`PostForm-form ${isFormVisible ? "visible" : ""}`}>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="PostForm-input"
              required
            />
          </label>
          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="PostForm-textarea"
              required
              maxLength="255"
            />
          </label>
          {error && <p className="PostForm-error">{error}</p>}
          <button type="submit" className="PostForm-button">
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
