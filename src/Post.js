import React, { useState, useContext } from "react";
import axios from "axios";
import Comment from "./Comment";
import Modal from "./Modal";
import { AuthContext } from "./authContext";
import "./styles/Post.css";

const Post = ({ post, currentUser, token, onPostUpdated }) => {
  const { authData } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentBody) return;

    try {
      await axios.post(
        "https://project-management-server-4av5.onrender.com/add-comment",
        {
          postId: post.id,
          body: commentBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) => [
        ...prevComments,
        {
          body: commentBody,
          author: currentUser.firstName,
          createdAt: new Date(), // Ensure new comments use the current date
        },
      ]);
      setCommentBody("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `https://project-management-server-4av5.onrender.com/edit-post/${post.id}`,
        {
          title: editedTitle,
          body: editedBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdated(response.data.updatedPost); // Update the post list with the updated post
      setIsEditing(false);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://project-management-server-4av5.onrender.com/delete-post/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onPostUpdated(null, post.id); // Remove the deleted post from the list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post">
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <small>
          Author: <i>{post.author}</i>
        </small>
        {authData?.user?.uid === post.uid || authData?.user?.isAdmin ? (
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : null}
      </div>
      {comments.length > 0 && (
        <div className="comments">
          <h3>Comments</h3>
          {comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentBody}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      )}
      <Modal isVisible={isEditing} onClose={() => setIsEditing(false)}>
        <h2>Edit Post</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          maxLength="255"
          className="modal-input"
        />
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          maxLength="255"
          className="modal-textarea"
        />
        <button onClick={handleEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Post;
