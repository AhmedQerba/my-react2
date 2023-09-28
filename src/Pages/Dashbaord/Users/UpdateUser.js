import { useContext, useEffect, useState } from "react";
import { User } from "../../Website/Auth/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
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

  const id = window.location.pathname.split("/").slice(-1)[0];
  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      // send data
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
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

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Update User</h1>
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
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
