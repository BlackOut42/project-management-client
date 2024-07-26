import React from "react";
import "./styles/Post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Author: {post.author}</p>
      {post.comments && post.comments.length > 0 && (
        <div className="comments">
          <h3>Comments</h3>
          {post.comments
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment.body}</p>
                <small>By: {comment.author}</small>
                <small>
                  At:{" "}
                  {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                </small>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Post;
