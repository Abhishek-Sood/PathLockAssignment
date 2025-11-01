import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
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
    <>
      <style>{`
        @media (max-width: 768px) {
          .login-card-responsive {
            padding: 2.5rem 2rem !important;
            max-width: 26rem !important;
          }
          .login-title-responsive {
            font-size: 1.75rem !important;
            margin-bottom: 1.75rem !important;
          }
          .login-input-responsive {
            padding: 0.75rem 0.875rem !important;
            font-size: 0.9rem !important;
          }
          .login-button-responsive {
            padding: 0.75rem 1rem !important;
            font-size: 0.9375rem !important;
          }
        }

        @media (max-width: 480px) {
          .login-container-responsive {
            padding: 0.75rem !important;
          }
          .login-card-responsive {
            padding: 2rem 1.5rem !important;
            border-radius: 1.25rem !important;
            max-width: 100% !important;
          }
          .login-title-responsive {
            font-size: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .login-input-responsive {
            padding: 0.75rem !important;
            font-size: 0.875rem !important;
            border-radius: 0.625rem !important;
            margin-bottom: 1rem !important;
          }
          .login-button-responsive {
            padding: 0.75rem !important;
            font-size: 0.9rem !important;
            border-radius: 0.625rem !important;
          }
          .login-footer-responsive {
            font-size: 0.8125rem !important;
            margin-top: 1.25rem !important;
          }
        }

        @media (max-width: 360px) {
          .login-card-responsive {
            padding: 1.5rem 1.25rem !important;
          }
          .login-title-responsive {
            font-size: 1.375rem !important;
          }
          .login-input-responsive,
          .login-button-responsive {
            font-size: 0.8125rem !important;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        className="login-container-responsive"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "1rem",
        }}
      >
        <div
          className="login-card-responsive"
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            padding: "3rem 2.5rem",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            width: "100%",
            maxWidth: "28rem",
            backdropFilter: "blur(10px)",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          <h2
            className="login-title-responsive"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome Back 👋
          </h2>

          <input
            className="login-input-responsive"
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              border: focusedInput === 'email' ? "2px solid #667eea" : "2px solid #e5e7eb",
              padding: "0.875rem 1rem",
              fontSize: "0.9375rem",
              outline: "none",
              transition: "all 0.3s ease",
              backgroundColor: "#fafafa",
              color: "#1f2937",
              boxShadow: focusedInput === 'email' ? "0 0 0 4px rgba(102, 126, 234, 0.1)" : "none",
              marginBottom: "1.25rem",
              boxSizing: "border-box",
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setFocusedInput(null)}
          />

          <input
            className="login-input-responsive"
            style={{
              width: "100%",
              borderRadius: "0.75rem",
              border: focusedInput === 'password' ? "2px solid #667eea" : "2px solid #e5e7eb",
              padding: "0.875rem 1rem",
              fontSize: "0.9375rem",
              outline: "none",
              transition: "all 0.3s ease",
              backgroundColor: "#fafafa",
              color: "#1f2937",
              boxShadow: focusedInput === 'password' ? "0 0 0 4px rgba(102, 126, 234, 0.1)" : "none",
              marginBottom: "1.25rem",
              boxSizing: "border-box",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setFocusedInput(null)}
          />

          <button
            className="login-button-responsive"
            onClick={handleLogin}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.875rem 1rem",
              fontWeight: "600",
              fontSize: "1rem",
              letterSpacing: "0.3px",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              marginTop: "0.5rem",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            Login
          </button>

          <p
            className="login-footer-responsive"
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            No account?{" "}
            <Link
              to="/register"
              style={{
                color: "#667eea",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
