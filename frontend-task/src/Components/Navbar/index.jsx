import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Store/Slices/authSlice";
import logo from "../../assets/logo.svg";
export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>
              <img src={logo} alt="TaskTracker Logo" />
              </Link>
            </li>
            <li>
              <Link to={"/"} >
              Home
              </Link>
            </li>
            <li>
              <Link to={"/about"} >
              About
              </Link>
            </li>
            {token && (
              <li>
                <Link to={"/tasks"} >
                Task
                </Link>
              </li>
            )}
            {token ? (
              <li onClick={() => dispatch(logout())}>Logout</li>
            ) : (
              <li>
                <Link to={"/auth"} >
                Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
