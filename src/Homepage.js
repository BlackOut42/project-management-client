import React, { useContext } from "react";
import { AuthContext } from "./authContext"; // Adjust import if necessary
import PostForm from "./postForm";
import PostFeed from "./postFeed";
import "./styles/Homepage.css"; // Import the CSS file for Homepage

const Homepage = () => {
  const { authData } = useContext(AuthContext);
  const user = authData?.user;

  return (
    <div className="homepage-container">
      <div className="newpost-section">
        {user && (
          <>
            {/* <h2>{`${user.firstName}, Welcome 😄!`}</h2> */}
            <PostForm />
          </>
        )}
      </div>
      <div className="post-feed-section">
        <PostFeed />
      </div>
    </div>
  );
};

export default Homepage;
