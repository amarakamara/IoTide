import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth.userid);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
