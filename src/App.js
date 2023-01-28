import './App.css';
import React, { createContext, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Banner from "./Components/Banner/Main.js";
import Game from "./Components/Game/Main.js";
import Home from "./Components/Home/Main.js";
import Login from "./Components/Logging/Login.js";
import Logout from "./Components/Logging/Logout.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Main.js";
import Taproom from "./Components/Taproom/Main.js";
import Footer from "./Components/Banner/Footer.js";

const LoggedInContext = createContext();
const UserContext = createContext();

export { LoggedInContext, UserContext };

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <UserContext.Provider value={user}>
        <>
          <div className="App">
            <Banner />
            <div id="content_panel">
              <Routes>
                <Route path="/game" element={<Game />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/taproom" element={<Taproom />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </>
      </UserContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default App;