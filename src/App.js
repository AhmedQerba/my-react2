import "./style.css";

import { Route, Routes } from "react-router-dom";
// Website
import Home from "./Pages/Website/Home";
// Auth
import SignUp from "./Pages/Website/Auth/SignUp";
import Login from "./Pages/Website/Auth/Login";
// Dashbaord
import Dashboard from "./Pages/Dashbaord/Dashboard";
import "./Pages/Dashbaord/dashboard.css";
// Users
import Users from "./Pages/Dashbaord/Users/Users";
import UpdateUser from "./Pages/Dashbaord/Users/UpdateUser";
import CreateUser from "./Pages/Dashbaord/Users/CreateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashbaord/Products/Products";
import CreateProduct from "./Pages/Dashbaord/Products/CreateProduct";
import UpdateProduct from "./Pages/Dashbaord/Products/UpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products/" element={<Products />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
