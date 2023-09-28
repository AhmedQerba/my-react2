import Header from "../../../Components/Header";

import { useContext, useState } from "react";
import { User } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);

  const nav = useNavigate();
  const userNow = useContext(User);

  const cookie = new Cookies({ path: "/" });

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer ", token, { path: "/" });
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });

      nav("/dashboard");
      if (res.status === 200) {
        window.localStorage.setItem("email", email);
        // window.location.pathname = `${props.pathname}`;
      }
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
    }
    setAccept(true);
  }

  return (
    <div>
      <Header />
      <div className="register">
        <div className="signup">
          <form className="signupForm" onSubmit={Submit}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {accept && err && <p className="error">Wrong Email or Password</p>}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
