import React, { useEffect, useState } from "react";

function About() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/about").then((response) => {
      response.json().then((data) => {
        console.log(backendData.Team);
        setBackendData(data);
      });
    });
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
        </>
      )}
    </div>
  );
}

export default About;
