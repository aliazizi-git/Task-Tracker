import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/authSlice";
import logo from "../../assets/logo.svg";
import { LogOut, User, CheckSquare } from "lucide-react";

export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-medium transition"
      : "text-slate-400 hover:text-slate-200 font-medium transition";

  return (
    <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TaskTracker" className="h-8 w-auto" />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
          {token && (
            <NavLink to="/tasks" className={navLinkStyle}>
              Tasks
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {token ? (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                {user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
