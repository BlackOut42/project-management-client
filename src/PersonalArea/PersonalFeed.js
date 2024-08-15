import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "../Post";
import { AuthContext } from "../authContext";
import "../styles/PostFeed.css";

const PersonalFeed = ({ fetchRoute }) => {
  const { authData } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (loading || !hasMore) return; // Prevent multiple calls

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(fetchRoute, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      });

      const newPosts = response.data.posts.filter((post) => {
        if (post.sharedByUid) {
          return (
            user?.uid === post.sharedByUid ||
            user?.uid === post.uid ||
            (user?.following &&
              user?.following?.map(String).includes(String(post.sharedByUid)))
          );
        }
        return true;
      });

      const newLastVisible = response.data.lastVisible;

      setPosts((prevPosts) => {
        // Create a map to ensure uniqueness
        const postMap = new Map();
        [...prevPosts, ...newPosts].forEach((post) => {
          postMap.set(post.id, post);
        });
        return Array.from(postMap.values());
      });

      setLastVisible(newLastVisible);
      setHasMore(newLastVisible !== null); // Check if there are more posts to load
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial load
  }, [fetchRoute]); // Depend on fetchRoute to refetch if it changes

  const handleLoadMore = () => {
    fetchPosts();
  };

  const handlePostUpdated = (updatedPost, deletedPostId) => {
    setPosts((prevPosts) => {
      if (deletedPostId) {
        return prevPosts.filter((post) => post.id !== deletedPostId);
      }
      if (updatedPost && updatedPost.id) {
        return prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      }
      return prevPosts;
    });
  };

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          currentUser={JSON.parse(localStorage.getItem("user"))}
          token={localStorage.getItem("token")}
          onPostUpdated={handlePostUpdated}
        />
      ))}

      <button onClick={handleLoadMore} disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default PersonalFeed;
