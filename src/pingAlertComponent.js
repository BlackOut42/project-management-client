import React, { useEffect } from "react";

const PingAlertComponent = () => {
  
  useEffect(() => {
    

    const checkPath = () => {
      if (
        window.location.pathname === "/ping"
      ) {
        fetch("https://project-management-server-4av5.onrender.com/ping").then(
          (response) => {
            response.json().then((message) => {
              alert(message); // Display alert when visiting "/ping"
              
            });
          }
        );
        
      }
    };

    checkPath(); // Initial check when component mounts

    // Ensure effect runs only once by not including any dependencies
  }, []);

  return <></>;
};

export default PingAlertComponent;
