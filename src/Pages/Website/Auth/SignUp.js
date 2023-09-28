import Header from "../../../Components/Header";

import { useContext, useEffect, useState } from "react";
import { User } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nav = useNavigate();

  const userNow = useContext(User);
  // Cookie
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token, { path: "/" });

      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
      if (res.status === 200) {
        window.localStorage.setItem("email", email);
        // window.location.pathname = `${props.pathname}`;
      }
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="register">
        <div className="signup">
          <form className="signupForm" onSubmit={Submit}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {name === "" && accept && (
              <p className="error">Username Is Required</p>
            )}
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError && (
              <p className="error">Email already exist</p>
            )}
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className="error">Password must be greater than 8 chars</p>
            )}
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password..."
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            {passwordR !== password && accept && (
              <p className="error">Password does not match</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
