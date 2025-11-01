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
      className="container"
      style={{
        maxWidth: "90%",
        margin: "0 auto",
        background: "#f9fafb",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 0.2rem 0.6rem rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "2rem",
          color: "#1f2937",
          letterSpacing: "0.05rem",
        }}
      >
        Projects Dashboard
      </h2>

      {/* Add Project Section */}
      <div
        className="card"
        style={{
          borderRadius: "0.8rem",
          border: "0.05rem solid #e5e7eb",
          background: "#ffffff",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <h5
          style={{
            fontWeight: 600,
            color: "#374151",
            marginBottom: "1rem",
          }}
        >
          Add New Project
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            className="form-control"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              borderRadius: "0.6rem",
              padding: "0.7rem 1rem",
              border: "0.05rem solid #d1d5db",
              boxShadow: "inset 0 0.1rem 0.2rem rgba(0,0,0,0.05)",
            }}
          />

          <textarea
            className="form-control"
            placeholder="Project description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              borderRadius: "0.6rem",
              padding: "0.7rem 1rem",
              border: "0.05rem solid #d1d5db",
              boxShadow: "inset 0 0.1rem 0.2rem rgba(0,0,0,0.05)",
              resize: "none",
              minHeight: "6rem",
            }}
          />

          <button
            onClick={addProject}
            style={{
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "0.6rem",
              padding: "0.8rem 1.2rem",
              fontWeight: 600,
              color: "#fff",
              width: "fit-content",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
             Add Project
          </button>
        </div>
      </div>

      {/* ✅ Project Cards Grid */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              background: "#ffffff",
              borderRadius: "0.8rem",
              border: "0.05rem solid #e5e7eb",
              padding: "1.2rem 1.5rem",
              boxShadow: "0 0.1rem 0.3rem rgba(0,0,0,0.05)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 0.3rem 0.8rem rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0.1rem 0.3rem rgba(0,0,0,0.05)";
            }}
          >
            <div>
              <strong>
                <Link
                  to={`/projects/${p.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#2563eb",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </Link>
              </strong>

              {p.recommendedOrder.length > 0 ? (
                <div style={{ marginTop: "0.8rem" }}>
                  <span
                    style={{
                      color: "#374151",
                      fontWeight: 600,
                    }}
                  >
                    Recommended Task Order:
                  </span>
                  <ol
                    style={{
                      marginLeft: "1.5rem",
                      marginTop: "0.5rem",
                      color: "#4b5563",
                      fontSize: "0.95rem",
                    }}
                  >
                    {p.recommendedOrder.map((task: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#9ca3af",
                    marginTop: "0.5rem",
                  }}
                >
                  No tasks yet
                </p>
              )}
            </div>

            <button
              onClick={() => deleteProject(p.id)}
              style={{
                borderRadius: "0.6rem",
                padding: "0.5rem 1rem",
                fontWeight: 600,
                border: "none",
                backgroundColor: "#dc2626",
                color: "white",
                marginTop: "1rem",
                cursor: "pointer",
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

    {/* ✅ Inline Media Queries */}
    <style>
      {`
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
          }
          .container {
            padding: 1.5rem;
          }
          h2 {
            font-size: 1.3rem;
          }
          ul {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          ul {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1201px) {
          ul {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}
    </style>
  </>
);
}
	
