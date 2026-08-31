import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminResetPassword() {
const navigate = useNavigate();
const [searchParams] = useSearchParams();

const token = searchParams.get("token");

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("");
const [modalMessage, setModalMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
if (!token) {
  setModalType("error");
  setModalMessage("Invalid or missing password reset token.");
  setShowModal(true);
  return;
}
if (password.length < 6) {
  setModalType("error");
  setModalMessage("Password must be at least 6 characters long.");
  setShowModal(true);
  return;
}
if (password !== confirmPassword) {
  setModalType("error");
  setModalMessage("Passwords do not match.");
  setShowModal(true);
  return;
}
setIsLoading(true);
try {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/admin/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        password,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    setModalType("error");
    setModalMessage(
      data.message || "Unable to reset admin password.",
    );
    setShowModal(true);
    return;
  }
  setModalType("success");
  setModalMessage(
    "Admin password has been reset successfully.",
  );
  setShowModal(true);
  setTimeout(() => {
    navigate("/admin");
  }, 1800);
} catch (error) {
  setModalType("error");
  setModalMessage(
    "Unable to connect to the server. Please try again.",
  );
  setShowModal(true);
} finally {
  setIsLoading(false);
}
};
return ( <div className="admin-reset-password-page">
{showModal && ( <div className="admin-login-overlay"> <div className="admin-login-modal">
<div
className={`admin-login-modal-icon ${
                modalType === "success" ? "success" : "error"
              }`}
>
{modalType === "success" ? "✓" : "!"} </div>
        <h2>
          {modalType === "success"
            ? "Password Reset Successful"
            : "Password Reset Failed"}
        </h2>

        <p>{modalMessage}</p>

        {modalType === "success" && (
          <p>Returning to Admin Login...</p>
        )}
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
  <div className="admin-reset-password-card">
    <div className="admin-reset-password-header">
      <h1 className="admin-reset-password-brand">
        Nex-Style <span>Admin</span>
      </h1>
      <p className="admin-reset-password-subtitle">
        Create a new password for your admin account.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="admin-reset-password-form"
    >
      <div className="admin-reset-password-field">
        <label htmlFor="admin-new-password">
          New Password
        </label>

        <input
          id="admin-new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          autoComplete="new-password"
        />
      </div>

      <div className="admin-reset-password-field">
        <label htmlFor="admin-confirm-password">
          Confirm New Password
        </label>

        <input
          id="admin-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="admin-reset-password-button"
      >
        {isLoading ? "Resetting Password..." : "Reset Password"}
      </button>

      <button
        type="button"
        onClick={() => navigate("/admin")}
        className="admin-reset-password-back"
      >
        Back to Admin Login
      </button>
    </form>
  </div>
</div>

);
}
