import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../components/App";
import UserRegister from "../pages/UserRegister";
import AdminRegister from "../pages/AdminRegister";
import UserLogin from "../pages/UserLogin";
import AdminLogin from "../pages/AdminLogin";
import VerifyEmail from "../pages/VerifyEmail";
import EmailVerified from "../pages/EmailVerified";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PasswordReset from "../pages/PasswordReset";
import ResetSuccessful from "../pages/ResetSuccessful";

import "../custom.scss";
//import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard/:username" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<App />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/:role/emailverified/:token" element={<EmailVerified />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/passwordreset/:token" element={<PasswordReset />} />
      <Route path="/:role/resetsuccessful" element={<ResetSuccessful />} />
    </Routes>
  );
}
