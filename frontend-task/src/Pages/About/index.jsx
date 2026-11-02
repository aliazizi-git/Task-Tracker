import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">About TaskTracker</h2>
        <p className="text-xs text-slate-400 mt-1">Project overview and roadmap solution</p>
      </div>

      <div className="prose prose-invert text-sm text-slate-300 space-y-4">
        <p>
          This project is an implementation of the{" "}
          <a
            href="https://roadmap.sh/projects/task-tracker"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 underline underline-offset-4"
          >
            <span>Roadmap.sh Task Tracker project</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          , upgraded into a complete Fullstack production-grade architecture.
        </p>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-white font-semibold text-sm">Key Capabilities</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Modular Node.js & Express REST API with MongoDB (Mongoose)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>JWT Authentication with bcrypt password hashing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Task status management: <code>todo</code>, <code>in-progress</code>, <code>done</code></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>React 19 + Redux Toolkit + Protected Route Guard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
