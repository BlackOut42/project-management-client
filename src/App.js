import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import About from "./About";
import Login from "./Login";
import PingAlertComponent from "./pingAlertComponent";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <PingAlertComponent />
        <div className="App-content">
          <Routes>
            <Route
              path="https://foodiefriends.onrender.com/"
              element={<Homepage />}
            />
            <Route
              path="https://foodiefriends.onrender.com/homepage"
              element={<Homepage />}
            />
            <Route
              path="https://foodiefriends.onrender.com/about"
              element={<About />}
            />
            <Route
              path="https://foodiefriends.onrender.com/login"
              element={<Login />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
