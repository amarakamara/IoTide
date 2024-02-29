import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import EmailVerified from "../pages/EmailVerified";
import Dashboard from "../pages/Dashboard";

import "../custom.scss";
//import Login from "../pages/Login";
import PrivateRoute from "../utils/PrivateRoute";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard/:username" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<App />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/emailverified/:token" element={<EmailVerified />} />
    </Routes>
  );
}
