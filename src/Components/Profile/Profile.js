import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, UserContext } from '../../App';

function Profile({ setUser, logout }) {
    
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();
    
  useEffect(() => {
    function setStates() {
      setEmail(user.email);
      setPic(user.pic_url);
      setIsLoaded(true);
      console.log("setStates")
    };
    if (user) {
      setStates();
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  async function handleLogout() {
    await fetch("/logout", {
      method: "DELETE"
    });
    logout();
  };

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await fetch(`/users/${user.id}`, {
        method: "DELETE"
      });
      alert("Your account has been deleted.")
      logout();
    }
  };

  async function handleProfileChange(e) {
    e.preventDefault();
    const res = await fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        email: email,
        pic_url: pic,
        }),
      });
    const user = await res.json();
    if (user.errors) {
      alert(user.errors);
    } else {
      setUser(user);
    }
  };

  async function handlePasswordChange(e) {
    const res = await fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        password
      }),
    });
    const user = await res.json();
    if (user.errors) {
      alert(user.errors)
    } else {
      console.log(user);
      setUser(user);
    }
  };

  return (
    <div className="container">
      {
        isLoaded?
          <div className="card" id="profile_card">
            <div className="brand-logo"></div>
            <p>{user.username}</p>
            <div className="side-by-side_container">
              <div className="side-by-side_element">
                <h2>change profile</h2>
                <form onSubmit={handleProfileChange}>
                  <label htmlFor="email">
                      email
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label htmlFor="pic">
                      profile picture
                    <input
                      type="url"
                      name="pic"
                      value={pic}
                      onChange={(e) => setPic(e.target.value)}
                    />
                  </label>
                  <input
                    type="submit"
                    value="submit profile"
                    className="navlink"
                  />
                </form>
              </div>
              <div className="side-by-side_element">
                <h2>change password</h2>
                <form onSubmit={handlePasswordChange}>
                  <input
                    type="text"
                    className="hidden"
                    autoComplete="username"
                  />
                  <label htmlFor="password">
                    <p>new password</p>
                    <p className="subtext">(eight character minimum)</p>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </label>
                  <label htmlFor="passwordConfirmation">
                    confirm new password
                    <input
                      type="password"
                      name="passwordConfirmation"
                      autoComplete="new-password-confirmation"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </label>
                  <input
                    type="submit"
                    value="submit password"
                    className="navlink"
                  />
                </form>
                <div>
                  <h2>manage account</h2>
                  <button onClick={e => handleLogout()} className="navlink">logout</button>
                  <button onClick={e => handleDelete()} className="navlink">delete account</button>
                </div>
              </div>
            </div>
          </div>
        : <p>Loading...</p>
      }
    </div>
  );
};

export default Profile;