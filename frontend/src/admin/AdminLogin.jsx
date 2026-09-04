import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setModalType("error");
        setModalMessage(data.message || "Invalid username or password.");
        setShowModal(true);
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(data));

      setModalType("success");
      setModalMessage("Welcome to Nex-Style Admin Dashboard 🎉");
      setShowModal(true);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1800);
    } catch (error) {
      setModalType("error");
      setModalMessage("Unable to connect to the server. Please try again.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {showModal && (
        <div className="admin-login-overlay">
          <div className="admin-login-modal">
            <div
              className={`admin-login-modal-icon ${
                modalType === "success" ? "success" : "error"
              }`}
            >
              {modalType === "success" ? "✓" : "!"}
            </div>

            <h2>
              {modalType === "success" ? "Login Successful" : "Login Failed"}
            </h2>

            <p>{modalMessage}</p>

            {modalType === "success" && <p>Opening Admin Dashboard...</p>}

            {modalType === "error" && (
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="admin-login-modal-button"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1 className="admin-login-brand">
            Nex-Style <span>Admin</span>
          </h1>

          <p className="admin-login-subtitle">
            Sign in to access the Admin Dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="admin-username">Username</label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-login-field password-field-wrapper">
            <label htmlFor="admin-password">Password</label>
            <div className="btn">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-eye-button"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696C3.714 7.5 7.523 5 12 5s8.286 2.5 9.938 6.652a1 1 0 0 1 0 .696C20.286 16.5 16.477 19 12 19s-8.286-2.5-9.938-6.652Z" />

                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                    <path d="M9.88 5.09A9.94 9.94 0 0 1 12 5c4.48 0 8.29 2.5 9.94 6.65a1 1 0 0 1 0 .7 12.3 12.3 0 0 1-2.07 3.24" />
                    <path d="M6.61 6.61A12.5 12.5 0 0 0 2.06 11.65a1 1 0 0 0 0 .7C3.71 16.5 7.52 19 12 19a9.9 9.9 0 0 0 5.39-1.61" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="admin-login-button"
          >
            {isLoading ? "Signing In..." : "Admin Login"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/forgot-password")}
            className="admin-forgot-password"
          >
            Forgot Password?{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
