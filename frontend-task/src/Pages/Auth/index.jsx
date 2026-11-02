import React, { useState } from "react";
import useFormFields from "../../Hooks/useFormFields";
import { loginUser, registerUser } from "../../Services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Store/Slices/authSlice";
import notify from "../../Utils/notify";
import { LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fields, handleChange] = useFormFields({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const result = await loginUser({
          username: fields.username,
          password: fields.password,
        });
        notify("success", "Welcome back!");
        dispatch(login(result.data));
        navigate("/tasks");
      } else {
        const result = await registerUser(fields);
        if (result.success) {
          notify("success", "Account created! Please sign in.");
          setIsLoginMode(true);
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      notify("error", errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-xl bg-indigo-600/10 text-indigo-400 mb-3 border border-indigo-500/20">
            {isLoginMode ? <LogIn className="h-6 w-6" /> : <UserPlus className="h-6 w-6" />}
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLoginMode
              ? "Sign in to manage and track your tasks"
              : "Register to get started with your tasks"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. john_doe"
              value={fields.username}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={fields.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={fields.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-2.5 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-indigo-600/20 mt-2"
          >
            {isLoginMode ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
          {isLoginMode ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLoginMode(false)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLoginMode(true)}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
