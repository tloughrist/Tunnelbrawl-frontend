import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./Components/Banner/Main.js";
import Game from "./Components/Game/Main.js";
import Home from "./Components/Home/Main.js";
import Login from "./Components/Logging/Login.js";
import Logout from "./Components/Logging/Logout.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Main.js";
import Taproom from "./Components/Taproom/Main.js";


function App() {

  return (
    <>
      <>
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
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </div>
        </>
      </>
    </>
  );
}

export default App;