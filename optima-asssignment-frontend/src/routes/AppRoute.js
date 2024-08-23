import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../view/Home";
import Login from "../view/Login";
import SignUp from "../view/SignUp";
import PrivateRoute from "./PrivateRoute";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
