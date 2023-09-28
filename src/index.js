import React from "react";
import ReactDOM from "react-dom/client";
import "./Assets/all.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import UserProvider from "./Pages/Website/Auth/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </div>
);
