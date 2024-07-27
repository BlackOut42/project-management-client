import React from "react";

const Comment = ({ comment }) => {
  const createdAt = new Date(
    comment.createdAt.seconds * 1000 || comment.createdAt
  );

  return (
    <div className="comment">
      <p>{comment.body}</p>
      <small>By: {" " + comment.author + " "}</small>
      <small>At: {" " + createdAt.toLocaleString()}</small>
    </div>
  );
};

export default Comment;
