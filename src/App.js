import './App.css';
import React, { createContext, useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Banner from "./Components/Banner/Banner.js";
import Games from "./Components/Games/Games.js";
import Home from "./Components/Home/Home.js";
import Login from "./Components/Logging/Login.js";
import Logout from "./Components/Logging/Logout.js";
import Signup from "./Components/Logging/Signup.js";
import Profile from "./Components/Profile/Profile.js";
import Taproom from "./Components/Taproom/Taproom.js";
import Footer from "./Components/Banner/Footer.js";

const LoggedInContext = createContext();
const UserContext = createContext();
const FriendsContext = createContext();

export { LoggedInContext, UserContext, FriendsContext };

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState("unchecked");
  const [user, setUser] = useState();
  const [friends, setFriends] = useState([]);
  const [logNav, setLogNav] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/me");
      if (response.ok) {
        const usr = await response.json();
        setUser(usr);
        setIsLoggedIn(true);
        fetchFriends(usr.id);
      } else {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, [logNav]);

  async function fetchFriends(id) {
    const response = await fetch(`users/${id}/friends`);
    if (response.ok) {
      const frnds = await response.json();
      setFriends(frnds);
    }
  };

  function onLogin(user) {
    async function fetchData() {
      const response = await fetch("/me");
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        setIsLoggedIn(true);
        fetchFriends(user.id);
      } else {
        setIsLoggedIn(false);
      }
    };
    setUser(user);
    setIsLoggedIn(true);
    setLogNav(true);
    fetchData();
    navigate("/home");
  };

  function logout() {
    navigate("/logout");
    setUser();
    setFriends([]);
    setIsLoggedIn(false);
    setLogNav(false);
  };

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <UserContext.Provider value={user}>
        <FriendsContext.Provider value={friends}>
          <div className="App">
            <Banner />
            <div id="content_panel">
              <Routes>
                <Route path="/games" element={<Games />} />
                <Route path="/login" element={<Login
                  onLogin={onLogin}
                />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile
                  setUser={setUser}
                  logout={logout}
                />} />
                <Route path="/taproom" element={<Taproom />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </FriendsContext.Provider>
      </UserContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default App;