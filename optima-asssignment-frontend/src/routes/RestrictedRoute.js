import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RestrictedRoute = () => {
  const isAuth = localStorage.getItem("token");
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default RestrictedRoute;
