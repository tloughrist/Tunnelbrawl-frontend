import React, { useState } from "react";
import swal from '@sweetalert/with-react';

function Signup({ onLogin }) {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const res = await fetch(`/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: username,
          email: email,
          pic_url: profilePic,
          password: password
          }),
        });
      const usr = await res.json();
      if (usr.errors) {
        swal(`${usr.errors}`);
      } else {
        handleLogin();
      }
    }
  };

  async function handleLogin() {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username: username,
        password: password
      }),
    });
    const usr = await res.json();
    if (usr.errors) {
      swal(`${usr.errors}`);
    } else {
      onLogin(usr);
    }
  };

  return (
    <div className="card" id="profile_card">
    <div className="brand-logo"></div>
      <form className="stacked_element" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p><b>username</b></p>
          <p className="subtext">(five character minimum)</p>
          <input
            type="text"
            name="username"
            value={username}
            placeholder={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <p><b>email</b></p>
          <input
            type="email"
            name="email"
            value={email}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="pic">
          <p><b>profile pic</b></p>
          <input
            type="url"
            name="pic"
            value={profilePic}
            placeholder={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <p><b>password</b></p>
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
          <p><b>confirm password</b></p>
          <input
            type="password"
            name="passwordConfirmation"
            autoComplete="new-password-confirmation"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>        
        <input
          type="submit"
          value="submit"
          className="navlink"
        />
      </form>
    </div>
  );
};

export default Signup;