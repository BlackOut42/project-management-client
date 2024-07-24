import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import About from "./About";
import Login from "./Login";
import Register from "./Register";
import PingAlertComponent from "./pingAlertComponent";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
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
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
