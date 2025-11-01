import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#dbeafe", // light blue
        padding: "1rem 4%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Left - Task Manager */}
      <Link
        to="/"
        className="fw-bold"
        style={{
          fontSize: "1.4rem",
          color: "#1e3a8a",
          textDecoration: "none",
        }}
      >
        Task Manager
      </Link>

      {/* Right - Logout */}
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={logout}
        style={{
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          fontWeight: 600,
          transition: "background-color 0.2s ease",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#bfdbfe")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        Logout
      </button>

      {/* ✅ Responsive Fix */}
      <style>
        {`
          @media (max-width: 768px) {
            nav.navbar {
              flex-direction: column;
              align-items: center;
              gap: 0.6rem;
            }
          }
        `}
      </style>
    </nav>
  );
}
