import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome to TaskTracker</h1>
      <p>Organize, manage, and track your daily tasks effortlessly.</p>
      {token ? (
        <div>
          <p>Logged in as: {user?.username}</p>
          <Link to="/tasks">Go to My Tasks</Link>
        </div>
      ) : (
        <div>
          <Link to="/auth">Get Started / Sign In</Link>
        </div>
      )}
    </div>
  );
}