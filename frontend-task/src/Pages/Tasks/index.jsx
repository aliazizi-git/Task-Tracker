import React, { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../Services/taskService";
import notify from "../../Utils/notify";
import { DNA } from "react-loader-spinner";

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTask =
    filterStatus === "all"
      ? tasks
      : tasks?.filter((task) => task.status === filterStatus);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await getTasks(
        filterStatus === "all" ? {} : { status: filterStatus },
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
      notify("success", "Task Deleted!");
      fetchTasks();
    } catch (error) {
      notify("error", "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);
  return (
    <div>
      <div>
        <h2>My Tasks</h2>
      </div>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button>Add Task</button>
      </form>
      <div>
        <p>Filter By</p>
        <button onClick={() => setFilterStatus("all")}>all</button>
        <button onClick={() => setFilterStatus("todo")}>todo</button>
        <button onClick={() => setFilterStatus("in-progress")}>
          in-progress
        </button>
        <button onClick={() => setFilterStatus("done")}>done</button>
      </div>
      {loading && <DNA />}
      {!loading && tasks.length == 0 && <p>Tasks not found!</p>}
      {tasks?.map((task) => {
        return (
          <div key={task._id}>
            <div>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <select
              value={task.status}
              onChange={(e) => handleStatusChanges(task._id, e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">done</option>
            </select>
            <button onClick={() => handleTask(task._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
