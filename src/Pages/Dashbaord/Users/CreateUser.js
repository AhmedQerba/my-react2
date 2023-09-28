import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import { User } from "../../Website/Auth/UserContext";
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  // Context
  const context = useContext(User);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let res = await axios.post(
        "http://127.0.0.1:8000/api/user/create",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/users");
      if (res.status === 200) {
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
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Create User</h1>

          <form onSubmit={Submit}>
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
              <button className="btn" type="submit">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
