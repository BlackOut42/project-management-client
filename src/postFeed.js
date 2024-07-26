import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/PostFeed.css";

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (loading || !hasMore) return; // Prevent multiple calls

    setLoading(true);
    try {
      const response = await axios.get(
        "https://project-management-server-4av5.onrender.com/posts",
        {
          params: { lastVisible },
        }
      );

      const newPosts = response.data.posts;
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
  }, []); // Empty dependency array means this will only run on mount

  const handleLoadMore = () => {
    fetchPosts();
  };

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div className="comments">
            {post.comments?.length > 0 && (
              <>
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>{comment.text}</p>
                    <small>
                      {new Date(
                        comment.createdAt.seconds * 1000
                      ).toLocaleString()}
                    </small>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ))}

      <button onClick={handleLoadMore}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default PostFeed;
