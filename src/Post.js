import React, { useState } from "react";
import axios from "axios";
import Comment from "./Comment"; // Import the Comment component
import "./styles/Post.css";

const Post = ({ post, currentUser, token }) => {
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
          createdAt: new Date(),
        },
      ]);
      setCommentBody("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>
        Author: <i>{post.author}</i>
      </small>
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
    </div>
  );
};

export default Post;
