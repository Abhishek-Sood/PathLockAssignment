import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      let bodyRequest = {
        Username: email,
        password: password,
      };

      await api.post("/auth/register", bodyRequest);
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #007bff, #6f42c1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: 700,
            color: "#333",
            marginBottom: "30px",
          }}
        >
          Create an Account ✨
        </h2>

        <div className="d-flex flex-column gap-3">
          <input
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "12px",
              fontSize: "15px",
              transition: "0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1px solid #6f42c1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1px solid #ccc")
            }
          />
          <input
            className="form-control"
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "12px",
              fontSize: "15px",
              transition: "0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.border = "1px solid #6f42c1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.border = "1px solid #ccc")
            }
          />

          <button
            className="btn w-100"
            onClick={handleRegister}
            style={{
              background: "linear-gradient(135deg, #6f42c1, #007bff)",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: 600,
              color: "white",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)")
            }
          >
            Register
          </button>
        </div>

        <p
          className="mt-3 text-center"
          style={{ marginTop: "20px", color: "#555", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#6f42c1",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
