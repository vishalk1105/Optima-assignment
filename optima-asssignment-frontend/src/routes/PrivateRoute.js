import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("token");
  console.log(auth, "auth");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
