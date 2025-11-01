import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
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
    <>
      <style>{`
        @media (max-width: 768px) {
          .register-card-responsive {
            padding: 2.5rem 2rem !important;
            max-width: 26rem !important;
          }
          .register-title-responsive {
            font-size: 1.75rem !important;
            margin-bottom: 1.75rem !important;
          }
          .register-input-responsive {
            padding: 0.75rem 0.875rem !important;
            font-size: 0.9rem !important;
          }
          .register-button-responsive {
            padding: 0.75rem 1rem !important;
            font-size: 0.9375rem !important;
          }
        }

        @media (max-width: 480px) {
          .register-container-responsive {
            padding: 0.75rem !important;
          }
          .register-card-responsive {
            padding: 2rem 1.5rem !important;
            border-radius: 1.25rem !important;
            max-width: 100% !important;
          }
          .register-title-responsive {
            font-size: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          .register-input-responsive {
            padding: 0.75rem !important;
            font-size: 0.875rem !important;
            border-radius: 0.625rem !important;
            margin-bottom: 1rem !important;
          }
          .register-button-responsive {
            padding: 0.75rem !important;
            font-size: 0.9rem !important;
            border-radius: 0.625rem !important;
          }
          .register-footer-responsive {
            font-size: 0.8125rem !important;
            margin-top: 1.25rem !important;
          }
        }

        @media (max-width: 360px) {
          .register-card-responsive {
            padding: 1.5rem 1.25rem !important;
          }
          .register-title-responsive {
            font-size: 1.375rem !important;
          }
          .register-input-responsive,
          .register-button-responsive {
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
        className="register-container-responsive"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "1rem",
        }}
      >
        <div
          className="register-card-responsive"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            borderRadius: "1.5rem",
            padding: "3rem 2.5rem",
            width: "100%",
            maxWidth: "28rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          <h2
            className="register-title-responsive"
            style={{
              textAlign: "center",
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "2rem",
              fontSize: "2rem",
              letterSpacing: "-0.5px",
            }}
          >
            Create an Account ✨
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <input
              className="register-input-responsive"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setFocusedInput(null)}
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
                boxSizing: "border-box",
              }}
            />
            <input
              className="register-input-responsive"
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setFocusedInput(null)}
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
                boxSizing: "border-box",
              }}
            />

            <button
              className="register-button-responsive"
              onClick={handleRegister}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.875rem 1rem",
                fontWeight: 600,
                color: "white",
                fontSize: "1rem",
                letterSpacing: "0.3px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
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
              Register
            </button>
          </div>

          <p
            className="register-footer-responsive"
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#667eea",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
