import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../Services/taskService";
import notify from "../../Utils/notify";
import { DNA } from "react-loader-spinner";
import { Plus, Trash2, CheckCircle2, Clock, ListTodo } from "lucide-react";

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await getTasks(
        filterStatus === "all" ? {} : { status: filterStatus }
      );
      setTasks(result.data || []);
    } catch (error) {
      notify("error", "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newDescription.trim()) return;
    try {
      await createTask({ description: newDescription });
      setNewDescription("");
      notify("success", "Task added successfully!");
      fetchTasks();
    } catch (error) {
      notify("error", "Failed to create task");
    }
  };

  const handleStatusChanges = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      notify("success", "Status updated!");
      fetchTasks();
    } catch (error) {
      notify("error", "Failed to update status");
    }
  };

  const handleTask = async (id) => {
    try {
      await deleteTask(id);
      notify("success", "Task deleted!");
      fetchTasks();
    } catch (error) {
      notify("error", "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);

  const filterTabs = [
    { key: "all", label: "All Tasks" },
    { key: "todo", label: "To Do" },
    { key: "in-progress", label: "In Progress" },
    { key: "done", label: "Done" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "done":
        return "bg-emerald-950/60 text-emerald-400 border-emerald-800/60";
      case "in-progress":
        return "bg-amber-950/60 text-amber-400 border-amber-800/60";
      default:
        return "bg-slate-800/60 text-slate-400 border-slate-700/60";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Task Manager</h2>
          <p className="text-xs text-slate-400 mt-1">Keep track of your daily tasks and workflow</p>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
          Total: <span className="text-indigo-400 font-semibold">{tasks.length}</span>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          placeholder="What needs to be done?..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-3 rounded-xl transition duration-200 cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilterStatus(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition cursor-pointer ${
              filterStatus === tab.key
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <DNA height="70" width="70" ariaLabel="loading" />
        </div>
      )}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60 p-8">
          <ListTodo className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium text-sm">No tasks found</p>
          <p className="text-slate-500 text-xs mt-1">Get started by creating your first task above.</p>
        </div>
      )}

      {/* Tasks List */}
      {!loading && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition duration-150"
            >
              <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <p
                  className={`text-sm text-slate-200 break-words flex-1 ${
                    task.status === "done" ? "line-through text-slate-500" : ""
                  }`}
                >
                  {task.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChanges(task._id, e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleTask(task._id)}
                  title="Delete task"
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/40 transition cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
