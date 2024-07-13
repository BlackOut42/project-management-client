import React, { useEffect } from "react";

const PingAlertComponent = () => {
  useEffect(() => {
    const checkPath = () => {
      if (
        window.location.pathname === "https://foodiefriends.onrender.com/ping"
      ) {
        alert("Pong:Team 4"); // Display alert when visiting "/ping"
      }
    };

    checkPath(); // Initial check when component mounts

    // Ensure effect runs only once by not including any dependencies
  }, []);

  return <></>;
};

export default PingAlertComponent;
