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
      fetchProjects(); // refresh list
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
      <div className="container mt-4">
        <h2>Projects</h2>
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Add New Project</h5>
          <div className="d-flex flex-column gap-2">
            <input
              className="form-control"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              style={{ visibility: "hidden" }}
              className="form-control"
              placeholder="Project description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="btn btn-primary align-self-start"
              onClick={addProject}
            >
              Add Project
            </button>
          </div>
        </div>

        <ul className="list-group">
          {projects.map((p) => (
            <li
              key={p.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>
                  <Link to={`/projects/${p.id}`}>{p.title}</Link>
                </strong>
                {p.recommendedOrder.length > 0 ? (
                  <div className="mt-2">
                    <span className="fw-bold">Recommended Task Order:</span>
                    <ol className="mt-1">
                      {p.recommendedOrder.map((task: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                        <li key={idx}>{task}</li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p className="text-muted mb-0">No tasks yet</p>
                )}
              </div>

              {/* 🗑️ Delete Button */}
              <button
                className="btn btn-sm btn-danger ms-3"
                onClick={() => deleteProject(p.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
