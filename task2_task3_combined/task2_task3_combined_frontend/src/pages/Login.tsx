import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let bodyRequest = {
        Username: email,
        password: password,
      };
      const res = await api.post("/auth/login", bodyRequest);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6f42c1, #007bff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontWeight: 700,
            fontSize: "28px",
          }}
        >
          Welcome Back 👋
        </h2>

        <input
          className="form-control mb-3"
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "12px",
            fontSize: "15px",
            outline: "none",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          style={{
            borderRadius: "10px",
            border: "1px solid #ccc",
            padding: "12px",
            fontSize: "15px",
            outline: "none",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #6f42c1, #007bff)",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontWeight: "600",
            fontSize: "16px",
            letterSpacing: "0.5px",
            transition: "0.3s",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.2)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)")
          }
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#555",
            fontSize: "14px",
          }}
        >
          No account?{" "}
          <Link
            to="/register"
            style={{
              color: "#007bff",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
