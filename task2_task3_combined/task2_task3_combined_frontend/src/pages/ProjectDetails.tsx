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
      Title: title,
      Description: description,
      DueDate: dueDate || null,
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
      <div
  style={{
    background: "linear-gradient(135deg, #007bff, #6610f2)",
    minHeight: "100vh",
    padding: "4vh 2vw",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    className="container"
    style={{
      width: "100%",
      maxWidth: "1000px",
      background: "white",
      borderRadius: "1rem",
      padding: "2rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      boxSizing: "border-box",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "2rem",
        fontWeight: 700,
        color: "#333",
      }}
    >
      Project Tasks 🗂️
    </h2>

    {/* 🧩 Add New Task */}
    {/* 🧩 Add New Task */}
<div
  style={{
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "clamp(1rem, 2vw, 2rem)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    marginBottom: "2rem",
  }}
>
  <h5
    style={{
      fontWeight: 600,
      marginBottom: "1rem",
      color: "#111",
    }}
  >
    Add New Task
  </h5>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      alignItems: "center",
    }}
  >
    <input
      className="form-control"
      style={{
        flex: "1 1 200px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "0.8rem",
        fontSize: "1rem",
      }}
      placeholder="Task title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      className="form-control"
      style={{
        flex: "2 1 300px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "0.8rem",
        fontSize: "1rem",
        minHeight: "90px",
      }}
      placeholder="Task description (optional)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <input
      title="date"
      type="date"
      className="form-control"
      style={{
        flex: "1 1 150px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        padding: "0.7rem",
        fontSize: "1rem",
      }}
      onChange={(e) => setDueDate(e.target.value)}
    />

    <button
      className="btn btn-primary"
      onClick={addTask}
      style={{
        flex: "0 0 auto",
        background: "linear-gradient(135deg, #6f42c1, #007bff)",
        border: "none",
        borderRadius: "8px",
        padding: "0.7rem 1.5rem",
        fontWeight: 600,
        fontSize: "1rem",
        transition: "0.3s",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)")
      }
    >
      Add Task
    </button>
  </div>
</div>


    {/* 📋 Task Table */}
    <div
      className="card"
      style={{
        border: "none",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
      }}
    >
      <div className="card-body" style={{ padding: 0 }}>
        <h5
          style={{
            background: "#343a40",
            color: "white",
            padding: "1rem 1.25rem",
            margin: 0,
            borderTopLeftRadius: "0.75rem",
            borderTopRightRadius: "0.75rem",
          }}
        >
          Tasks Overview
        </h5>
        <div style={{ overflowX: "auto" }}>
          <table
            className="table align-middle text-center"
            style={{
              marginBottom: 0,
              borderCollapse: "separate",
              borderSpacing: 0,
              width: "100%",
              fontSize: "0.95rem",
            }}
          >
            <thead
              style={{
                background: "#6f42c1",
                color: "white",
                fontWeight: 600,
              }}
            >
              <tr>
                <th style={{ padding: "0.75rem" }}>Completed</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Parent Project</th>
              </tr>
            </thead>
            <tbody>
  {tasks.map((t) => (
    <tr
      key={t.id}
      style={{
        transition: "background 0.2s",
        textDecoration: t.isCompleted ? "line-through" : "none",
        opacity: t.isCompleted ? 0.6 : 1, // faded look for completed
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.background = "#f1f3f5")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      <td style={{ padding: "10px" }}>
        <input
          title="date"
          type="checkbox"
          checked={t.isCompleted}
          onChange={() => toggleCompletion(t)}
          className="form-check-input"
          style={{ transform: "scale(1.2)" }}
        />
      </td>
      <td style={{ fontWeight: 600 }}>{t.title}</td>
      <td>{t.description || "—"}</td>
      <td>
        {t.dueDate
          ? new Date(t.dueDate).toLocaleDateString()
          : "—"}
      </td>
      <td style={{ color: "#007bff" }}>
        Project #{t.projectId}
      </td>
    </tr>
  ))}
  {tasks.length === 0 && (
    <tr>
      <td colSpan={5} style={{ padding: "20px" }}>
        <em className="text-muted">
          No tasks yet — add your first one above ✨
        </em>
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  </div>

  {/* ✅ Media Queries for responsiveness */}
  <style>
    {`
      @media (max-width: 768px) {
        .container {
          padding: 1.5rem;
        }
        h2 {
          font-size: 1.25rem;
        }
        table th, table td {
          font-size: 0.85rem;
          padding: 0.5rem;
        }
        button.btn {
          width: 100%;
          text-align: center;
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 1rem;
        }
        h2 {
          font-size: 1.1rem;
        }
      }
    `}
  </style>
</div>
    </>
  );
}
