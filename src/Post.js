import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment";
import Modal from "./Modal";
import { AuthContext } from "./authContext";
import "./styles/Post.css";

const Post = ({
  post,
  currentUser,
  token,
  onPostUpdated,
  isOriginal = false,
}) => {
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
  const [isSharing, setIsSharing] = useState(false);
  const [showOriginalPost, setShowOriginalPost] = useState(false);
  const [originalPost, setOriginalPost] = useState(null);
  const [message, setMessage] = useState(null); // State for messages
  const hoverTimeoutRef = useRef(null); // Use ref to keep track of the timeout

  useEffect(() => {
    if (currentUser && currentUser.bookmarks) {
      setIsBookmarked(currentUser.bookmarks.includes(post.id));
    }
    if (currentUser && currentUser.following) {
      setIsFollowing(currentUser.following.includes(post.uid));
    }
  }, [currentUser, post.id, post.uid]);

  useEffect(() => {
    if (showOriginalPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showOriginalPost]);

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
      setMessage("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment:", error);
      setMessage("Error adding comment.");
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
      setMessage("Post edited successfully.");
    } catch (error) {
      console.error("Error editing post:", error);
      setMessage("Error editing post.");
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
      setMessage("");
    } catch (error) {
      console.error("Error deleting post:", error);
      setMessage("Error deleting post.");
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
      setMessage("");
    } catch (error) {
      console.error("Error toggling like:", error);
      setMessage("Error toggling like.");
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
      setMessage("");
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setMessage("Error toggling bookmark.");
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
      setMessage("");
    } catch (error) {
      console.error("Error toggling follow:", error);
      setMessage("Error toggling follow.");
    }
  };

  const handleShare = async () => {
    if (!currentUser) return; // Ensure currentUser is defined
    try {
      const response = await axios.post(
        `https://project-management-server-4av5.onrender.com/share-post/${
          post.originalPostId || post.id
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            user: JSON.stringify(currentUser),
          },
        }
      );

      onPostUpdated(response.data.sharedPostId); // Update the post list with the shared post
      setIsSharing(false);
      setMessage("Post shared successfully.");
    } catch (error) {
      console.error("Error sharing post:", error);
      setMessage("Error sharing post.");
    }
  };

  const fetchOriginalPost = async () => {
    try {
      const response = await axios.get(
        `https://project-management-server-4av5.onrender.com/posts/${post.originalPostId}`
      );
      setOriginalPost(response.data);
      setShowOriginalPost(true);
    } catch (error) {
      console.error("Error fetching original post:", error);
      setMessage("Error fetching original post.");
    }
  };

  const fetchLikeNames = async (postId) => {
    try {
      const response = await axios.get(
        `https://project-management-server-4av5.onrender.com/post-likes/${postId}`
      );

      setLikeNames(response.data.likes);
    } catch (error) {
      console.error("Error fetching like names:", error);
      setMessage("Error fetching like names.");
    }
  };

  const handleMouseEnter = (postId) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setLikePopupVisible(true);
      fetchLikeNames(postId);
    }, 500); // To prevent too much api calls by flickering the mouse over the button I set the timeout to 500 ms.
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setLikePopupVisible(false);
  };

  return (
    <div className="post">
      {message && <div className="message">{message}</div>}
      <div>
        {post.sharedBy && (
          <div className="shared-header">
            {post.sharedBy} has shared{" "}
            <span onClick={fetchOriginalPost} className="original-post-link">
              {post.author}'s post
            </span>
          </div>
        )}
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
        {(authData?.user?.uid === post.uid ||
          authData?.user?.isAdmin ||
          (post.sharedByUid === currentUser?.uid && post.sharedBy)) && (
          <div>
            {!post.sharedBy &&
              (authData?.user?.uid === post.uid || authData?.user?.isAdmin) && (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )}
            {(authData?.user?.uid === post.uid ||
              authData?.user?.isAdmin ||
              post.sharedByUid === currentUser?.uid) && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </div>
        )}
      </div>
      <div className="post-actions">
        <div
          className="like-container"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button
            onClick={() => handleToggleLike(post.id)}
            onMouseEnter={() => handleMouseEnter(post.id)}
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
          <>
            <button onClick={handleToggleBookmark} className="bookmark-button">
              {isBookmarked ? "Saved" : "Save"}
            </button>
            <button onClick={() => setIsSharing(true)} className="share-button">
              Share
            </button>
          </>
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
      <Modal isVisible={isSharing} onClose={() => setIsSharing(false)}>
        <h2>Share Post</h2>
        <p>Are you sure you want to share this post?</p>
        <button onClick={handleShare} className="modal-button">
          Share
        </button>
        <button onClick={() => setIsSharing(false)} className="modal-button">
          Cancel
        </button>
      </Modal>
      <Modal
        isVisible={showOriginalPost}
        onClose={() => setShowOriginalPost(false)}
      >
        {originalPost ? (
          <Post
            post={{ ...originalPost, id: originalPost.id }}
            currentUser={currentUser}
            token={token}
            onPostUpdated={onPostUpdated}
            isOriginal={true}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default Post;
