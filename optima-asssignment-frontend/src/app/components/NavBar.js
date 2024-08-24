import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../constants";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userData = getUser();
  const userName = userData?.user?.username;
  return (
    <nav className="navbar navbar-expand-lg justify-content-between bg-dark fixed-top text-white px-4 py-2 ">
      <div className="container-fluid">
        <div className="logoName">Optima Assignment</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-center g-5"
          id="navbarNavDropdown"
        >
          Home
        </div>
        <div>
          <ul className="navbar-nav gap-5">
            <li className="nav-item profileDiv" role="button">
              <div className="">Hello, {userName}</div>
            </li>
            <li className="" role="button" onClick={handleLogOut}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
