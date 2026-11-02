import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckSquare, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function Home() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <div className="py-12 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-400 text-xs font-medium mb-6">
        <Sparkles className="h-3.5 w-3.5" />
        Fullstack Task Management System
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight">
        Manage Your Daily Work with <span className="text-indigo-400">TaskTracker</span>
      </h1>

      <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">
        A high-performance task management application built with React 19, Redux Toolkit,
        Node.js, Express, and MongoDB.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {token ? (
          <Link
            to="/tasks"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/25"
          >
            <span>Go to My Tasks ({user?.username})</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-600/25"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          to="/about"
          className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium text-sm px-5 py-3 rounded-xl border border-slate-800 transition"
        >
          Learn More
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full mt-16 pt-12 border-t border-slate-900 text-left">
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60">
          <CheckSquare className="h-5 w-5 text-indigo-400 mb-2" />
          <h3 className="text-sm font-semibold text-white">Full CRUD Operations</h3>
          <p className="text-xs text-slate-400 mt-1">Create, update status, filter, and delete tasks instantly.</p>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60">
          <ShieldCheck className="h-5 w-5 text-indigo-400 mb-2" />
          <h3 className="text-sm font-semibold text-white">JWT Protected</h3>
          <p className="text-xs text-slate-400 mt-1">Secure token-based authentication and protected routes.</p>
        </div>
        <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60">
          <Zap className="h-5 w-5 text-indigo-400 mb-2" />
          <h3 className="text-sm font-semibold text-white">Fast & Responsive</h3>
          <p className="text-xs text-slate-400 mt-1">Powered by React 19, Tailwind CSS 4, and Vite.</p>
        </div>
      </div>
    </div>
  );
}
