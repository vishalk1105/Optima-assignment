import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  let token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  return user;
};
