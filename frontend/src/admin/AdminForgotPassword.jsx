import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminForgotPassword() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("");
const [modalMessage, setModalMessage] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();


setIsLoading(true);

try {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(
    apiUrl + "/api/auth/admin/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    setModalType("error");
    setModalMessage(
      data.message || "Unable to process password reset request.",
    );
    setShowModal(true);
    return;
  }

  setModalType("success");
  setModalMessage(
    "Password reset link has been sent to your admin email.",
  );
  setShowModal(true);
} catch (error) {
  console.error("ADMIN FORGOT PASSWORD ERROR:", error);

  setModalType("error");
  setModalMessage(
    "Unable to connect to the server. Please try again.",
  );
  setShowModal(true);
} finally {
  setIsLoading(false);
}


};

return ( <div className="admin-forgot-page">
{showModal && ( <div className="admin-forgot-overlay"> <div className="admin-forgot-modal">
<div
className={`admin-forgot-modal-icon ${
                modalType === "success" ? "success" : "error"
              }`}
>
{modalType === "success" ? "✓" : "!"} </div>


        <h2>
          {modalType === "success"
            ? "Reset Link Sent"
            : "Request Failed"}
        </h2>

        <p>{modalMessage}</p>

        {modalType === "success" && (
          <p>Please check your email inbox.</p>
        )}

        <button
          type="button"
          onClick={() => {
            setShowModal(false);

            if (modalType === "success") {
              navigate("/admin");
            }
          }}
          className="admin-forgot-modal-button"
        >
          {modalType === "success"
            ? "Back to Admin Login"
            : "Try Again"}
        </button>
      </div>
    </div>
  )}

  <div className="admin-forgot-card">
    <div className="admin-forgot-header">
      <h1 className="admin-forgot-brand">
        Nex-Style
      </h1>

      <p className="admin-forgot-title">
        Admin Password Reset
      </p>

      <p className="admin-forgot-description">
        Enter your admin email address and we will send you a
        password reset link.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="admin-forgot-form"
    >
      <div className="admin-forgot-field">
        <label htmlFor="admin-reset-email">
          Admin Email Address
        </label>

        <input
          id="admin-reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="admin-forgot-submit"
      >
        {isLoading
          ? "Sending Reset Link..."
          : "Send Reset Link"}
      </button>
    </form>

    <button
      type="button"
      onClick={() => navigate("/admin")}
      className="admin-forgot-back"
    >
      ← Back to Admin Login
    </button>
  </div>
</div>


);
}
