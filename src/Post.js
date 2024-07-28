import React, { useState, useContext, useRef, useEffect } from "react";
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
  const [likes, setLikes] = useState(post.likes || []);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [likePopupVisible, setLikePopupVisible] = useState(false);
  const [likeNames, setLikeNames] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const hoverTimeoutRef = useRef(null); // Use ref to keep track of the timeout

  useEffect(() => {
    if (currentUser && currentUser.bookmarks) {
      setIsBookmarked(currentUser.bookmarks.includes(post.id));
    }
    if (currentUser && currentUser.following) {
      setIsFollowing(currentUser.following.includes(post.uid));
    }
  }, [currentUser, post.id, post.uid]);

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
        `http://project-management-server-4av5.onrender.com/delete-post/${post.id}`,
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

  const handleToggleLike = async () => {
    if (!currentUser) return; // Ensure currentUser is defined
    try {
      const response = await axios.post(
        `https://project-management-server-4av5.onrender.com/toggle-like/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.userLiked) {
        setLikes(likes.filter((uid) => uid !== currentUser.uid));
        setLikeCount(likeCount - 1);
      } else {
        setLikes([...likes, currentUser.uid]);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleToggleBookmark = async () => {
    if (!currentUser) return; // Ensure currentUser is defined
    try {
      const response = await axios.post(
        `https://project-management-server-4av5.onrender.com/toggle-bookmark/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleToggleFollow = async () => {
    if (!currentUser) return; // Ensure currentUser is defined
    try {
      const response = await axios.post(
        `https://project-management-server-4av5.onrender.com/toggle-follow/${post.uid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFollowing(response.data.following);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const fetchLikeNames = async () => {
    try {
      const response = await axios.get(
        `https://project-management-server-4av5.onrender.com/post-likes/${post.id}`
      );

      setLikeNames(response.data.likes);
    } catch (error) {
      console.error("Error fetching like names:", error);
    }
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setLikePopupVisible(true);
      fetchLikeNames();
    }, 500); // To prevent too much api calls by flickering the mouse over the button I set the timeout to 500 ms.
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setLikePopupVisible(false);
  };

  return (
    <div className="post">
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <small>
          Author: <i>{post.author}</i>
          {currentUser && currentUser.uid !== post.uid && (
            <button onClick={handleToggleFollow} className="follow-button">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </small>
        {authData?.user?.uid === post.uid || authData?.user?.isAdmin ? (
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : null}
      </div>
      <div className="post-actions">
        <div
          className="like-container"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button
            onClick={handleToggleLike}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {likes.includes(currentUser?.uid) ? "Liked" : "Like"} ({likeCount})
          </button>
          <div className={`like-popup ${likePopupVisible ? "visible" : ""}`}>
            People who liked this post: <br />
            {likeNames.length > 0 ? likeNames.join(", ") : "No likes yet"}
          </div>
        </div>
        {currentUser && (
          <button onClick={handleToggleBookmark} className="bookmark-button">
            {isBookmarked ? "Saved" : "Save"}
          </button>
        )}
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
            maxLength="255"
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
