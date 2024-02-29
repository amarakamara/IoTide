import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import "../custom.scss";
//import Login from "../pages/Login";
//import PrivateRoute from "./PrivateRoute";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/login" element={<Login />} />
    </Routes>
  );
}
