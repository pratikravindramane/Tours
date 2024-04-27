import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isLoggedIn, role, logout } = useAuth();
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const decode = jwtDecode(token);

  const getNavLinks = () => {
    if (isLoggedIn === false) {
      return (
        <>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contactus" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tour/login" className="nav-link">
              TourLogin
            </Link>
          </li>{" "}
          <li className="nav-item">
            <Link to="/admin/login" className="nav-link">
              AdminLogin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/college/register" className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tour/register" className="nav-link">
              TourSignup
            </Link>
          </li>
        </>
      );
    } else {
      switch (role) {
        case "tour":
          return (
            <>
              <li className="nav-item">
                <Link to={`/tour/packages/`} className="nav-link">
                Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/tour/bookings/`} className="nav-link">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/places" className="nav-link">
                  Places
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0 text-danger"
              >
                Logout
              </button>
            </>
          );
        case "admin":
          return (
            <>
              <li className="nav-item">
                <Link to="/create-place" className="nav-link">
                  +Place
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/places" className="nav-link">
                  Places
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/packages" className="nav-link">
                  Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/colleges" className="nav-link">
                  Colleges
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tours" className="nav-link">
                  Tours
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contacts" className="nav-link">
                  Contacts
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0  text-danger"
              >
                Logout
              </button>
            </>
          );
        case "college":
          return (
            <>
              <li className="nav-item">
                <Link to={"/college/bookings/"} className="nav-link">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/places" className="nav-link">
                  Places
                </Link>
              </li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                className="bg-transparent py-2 px-3 border-0 text-danger"
              >
                Logout
              </button>
            </>
          );
        default:
          return null;
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Travelus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">{getNavLinks()}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
