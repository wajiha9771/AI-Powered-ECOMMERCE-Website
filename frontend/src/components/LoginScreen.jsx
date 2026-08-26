import React, { useState } from "react";
import { useLogin, useRegister } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import "./AuthLayout.css";

export default function LoginScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const triggerSuccessPopup = (msg) => {
    setModalMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      window.location.href = "/";
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedEmail = email?.toLowerCase().trim();

    if (isLoginMode) {
      loginMutation.mutate(
        { email: normalizedEmail, password },
        {
          onSuccess: (data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            triggerSuccessPopup("Login Successful! Welcome Back 🎉");
          },
          onError: (err) => alert(`Error: ${err.message}`),
        },
      );
    } else {
      registerMutation.mutate(
        { name, email: normalizedEmail, password },
        {
          onSuccess: (data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            triggerSuccessPopup("Registration Successful! Account Created 🚀");
          },
          onError: (err) => alert(`Error: ${err.message}`),
        },
      );
    }
  };
  const isPending = loginMutation.isPending || registerMutation.isPending;
  return (
    <div className="auth-container">
      {showSuccessModal && (
        <div className="custom-auth-overlay-backdrop">
          <div className="custom-auth-success-modal-card">
            <div className="modal-success-icon-badge">✓</div>
            <h3>{modalMessage}</h3>
            <p>Please wait, synchronizing account details...</p>
            <div className="modal-loading-dots-spinner"></div>
          </div>
        </div>
      )}

      <div className="auth-card">
        <h2>
          {isLoginMode ? "Welcome Back to Nex-Style" : "Create an Account"}
        </h2>
        <p className="auth-subtitle">
          {isLoginMode
            ? "Sign in to access your profile and track orders."
            : "Register now for faster checkouts."}
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="auth-field">
              <label>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name..."
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email..."
            />
          </div>
          <div className="auth-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password..."
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="auth-submit-btn"
          >
            {isPending
              ? "Processing... ⏳"
              : isLoginMode
                ? "Sign In 🔓"
                : "Register Account 📝"}
          </button>
        </form>
        <div className="auth-google-divider">
          <span>OR</span>
        </div>
        <div
          className="google-login-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              const base64Url = token.split(".")[1];
              const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split("")
                  .map((c) => {
                    return (
                      "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                  })
                  .join(""),
              );
              const googleUserData = JSON.parse(jsonPayload);
              const mockUserData = {
                _id: googleUserData.sub,
                name: googleUserData.name,
                email: googleUserData.email,
                role: "user",
                token: token,
              };
              localStorage.setItem("userInfo", JSON.stringify(mockUserData));
              triggerSuccessPopup(
                `Google Login Successful! Welcome ${googleUserData.name} `,
              );
            }}
            onError={() => {
              alert("Google Sign-In Failed. Try again!");
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="auth-switch-mode-btn"
        >
          {isLoginMode
            ? "Don't have an account? Register here"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
