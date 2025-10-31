import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { TaskItem } from "../types/types";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");


  const fetchTasks = async () => {
    const res = await api.get(`/projects/${id}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }
        let bodyRequest = {
        "Title": title, 
        "Description": description,
        "DueDate": dueDate || null,
        };

    await api.post(`/projects/${id}/tasks`, bodyRequest);
    setTitle("");
    setDescription("");
     setDueDate("");
    fetchTasks();
  };

  const toggleCompletion = async (task: TaskItem) => {
    await api.put(`/tasks/${task.id}`, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
  <>
    <Navbar />
    <div className="container mt-4">
      <h2 className="mb-3">Project Tasks</h2>

      {/* 🧩 Add New Task */}
      {/* 🧩 Add New Task */}
    <div className="card p-3 mb-4 shadow-sm">
      <h5>Add New Task</h5>
        <div className="d-flex flex-column gap-2">
          <input
            className="form-control"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control"
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* 🗓️ Due Date Input */}
          <input
          title="date"
            type="date"
            className="form-control"
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button className="btn btn-primary align-self-start" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>


      {/* 📋 Task Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Tasks Overview</h5>
          <table className="table table-striped align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Completed</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Parent Project</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td>
                    <input
                    title="date"
                      type="checkbox"
                      checked={t.isCompleted}
                      onChange={() => toggleCompletion(t)}
                      className="form-check-input"
                    />
                  </td>
                  <td>{t.title}</td>
                  <td>{t.description || "—"}</td>
                  <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</td>
                  <td>Project #{t.projectId}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </>
);
}