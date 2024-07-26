import React, { useContext } from "react";
import { AuthContext } from "./authContext"; // Adjust import if necessary
import PostForm from "./postForm";

const Homepage = () => {
  const { authData } = useContext(AuthContext);
  const user = authData?.user;

  return (
    <div className="centered-container">
      {user ? (
        <>
          <PostForm />
          <h2>{`${user.firstName} Welcome 😄!`}</h2>
        </>
      ) : (
        <h2>Welcome to the Homepage</h2>
      )}
      {/* Other homepage content */}
    </div>
  );
};

export default Homepage;
