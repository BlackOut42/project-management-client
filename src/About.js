import React, { useEffect, useState } from "react";

function About() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("https://project-management-server-4av5.onrender.com/about")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Team);
        setBackendData(data);
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }, []);

  return (
    <div className="centered-container">
      {typeof backendData.Team === "undefined" ? (
        <p>Loading Team...</p>
      ) : (
        <>
          <h1>Team Members</h1>
          {backendData.Team.map((member, i) => (
            <p key={i}>{member}</p>
          ))}
          <div className="project-description">
            <h1>About the Project</h1>
            <p>
              This project is a food-related social media platform designed to
              connect food enthusiasts, chefs, and restaurants. Our goal is to
              create a vibrant community where users can share recipes, review
              restaurants, and discover new culinary experiences.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
