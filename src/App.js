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
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
