import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import Navbar from "../components/Navbar";
import { Project } from "../types/types";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    const projectsData = res.data;

    const projectsWithSchedules = await Promise.all(
      projectsData.map(async (p: { tasks: any; id: any }) => {
        try {
          const scheduleRes = await api.post(
            `/v1/projects/${p.id}/schedule`,
            p.tasks?.map(
              (t: {
                title: string;
                estimatedHours?: number;
                dueDate?: string;
                dependencies?: string[];
              }) => ({
                title: t.title,
                estimatedHours: t.estimatedHours || 1,
                dueDate: t.dueDate,
                dependencies: t.dependencies || [],
              })
            ) || []
          );

          const schedule = scheduleRes.data.recommendedOrder || [];
          console.log("Fetched schedule for project:", p.id, schedule);
          return { ...p, recommendedOrder: schedule };
        } catch (err) {
          console.error("Failed to fetch schedule for project:", p.id, err);
          return { ...p, recommendedOrder: [] };
        }
      })
    );

    setProjects(projectsWithSchedules);
  };

  const addProject = async () => {
    const bodyRequest = {
      Title: title,
      Description: description,
    };

    await api.post("/projects", bodyRequest);
    fetchProjects();
    setTitle("");
    setDescription("");
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", id, err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container mt-4"
        style={{
          maxWidth: "800px",
          background: "#f9fafb",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "25px",
            color: "#1f2937",
            letterSpacing: "0.5px",
          }}
        >
          Projects Dashboard
        </h2>

        <div
          className="card p-3 mb-4 shadow-sm"
          style={{
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            padding: "20px",
          }}
        >
          <h5 style={{ fontWeight: 600, color: "#374151", marginBottom: "10px" }}>
            Add New Project
          </h5>

          <div className="d-flex flex-column gap-2">
            <input
              className="form-control"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                transition: "all 0.2s ease",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
              }}
            />
            <textarea
              style={{
                borderRadius: "8px",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                transition: "all 0.2s ease",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
                resize: "none",
                minHeight: "70px",
                visibility: "hidden",
              }}
              className="form-control"
              placeholder="Project description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="btn btn-primary align-self-start"
              onClick={addProject}
              style={{
                backgroundColor: "#2563eb",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d4ed8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
            >
              ➕ Add Project
            </button>
          </div>
        </div>

        <ul
          className="list-group"
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {projects.map((p) => (
            <li
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-start"
              style={{
                background: "#ffffff",
                marginBottom: "12px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                padding: "16px 20px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.01)";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
              }}
            >
              <div>
                <strong>
                  <Link
                    to={`/projects/${p.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#2563eb",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {p.title}
                  </Link>
                </strong>
                {p.recommendedOrder.length > 0 ? (
                  <div className="mt-2">
                    <span
                      className="fw-bold"
                      style={{ color: "#374151", fontWeight: 600 }}
                    >
                      Recommended Task Order:
                    </span>
                    <ol
                      className="mt-1"
                      style={{
                        marginLeft: "18px",
                        color: "#4b5563",
                        fontSize: "0.95rem",
                      }}
                    >
                      {p.recommendedOrder.map(
                        (
                          task:
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactElement
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<any>
                            | null
                            | undefined,
                          idx: React.Key | null | undefined
                        ) => (
                          <li key={idx}>{task}</li>
                        )
                      )}
                    </ol>
                  </div>
                ) : (
                  <p
                    className="text-muted mb-0"
                    style={{
                      fontSize: "0.9rem",
                      color: "#9ca3af",
                      marginTop: "4px",
                    }}
                  >
                    No tasks yet
                  </p>
                )}
              </div>

              <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => deleteProject(p.id)}
                style={{
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontWeight: 600,
                  border: "none",
                  backgroundColor: "#dc2626",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b91c1c")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc2626")
                }
              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
