import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function DesktopSearchBar({
  voiceText,
  setVoiceText,
  isListening,
  handleVoiceSearch,
  totalItems,
  openDrawer,
  userInfo,
  handleLogout,
}) {
  return (
    <div className="navbar-bottom-row">
      <div className="search-bar-wrapper">
        <div className="navbar-search">
          <svg className="search-svg-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder={
              isListening
                ? "Listening...🎙️ Speak now! 🗣"
                : "Search your Styles with AI Mode..."
            }
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            className="navbar-search-input"
          />
          {voiceText && (
            <button
              type="button"
              className="navbar-clear-search-btn"
              onClick={() => setVoiceText("")}
              title="Clear Search"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`navbar-voice-search-btn ${
              isListening ? "listening-active" : ""
            }`}
            title={isListening ? "Stop Listening" : "Search with AI Voice"}
          >
            {isListening ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="#fff" />
                <rect x="9" y="9" width="6" height="6" fill="#fff" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1v10M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" />
                <rect x="9" y="1" width="6" height="11" rx="3" ry="3" />
              </svg>
            )}
          </button>

          <Link
            to={
              voiceText.trim()
                ? `/search?q=${encodeURIComponent(voiceText.trim())}`
                : "#"
            }
            style={{ textDecoration: "none" }}
          >
            <button
              type="button"
              className="navbar-search-btn"
              disabled={!voiceText.trim()}
            >
              Search
            </button>
          </Link>
        </div>
        <div className="cart-wrapper">
          <button className="cart navbar-desktop-cart-btn" onClick={openDrawer}>
            Cart 🛒{" "}
            {totalItems > 0 && (
              <span className="cart-counter-badge">({totalItems})</span>
            )}
          </button>
          <Link
            to="/profile"
            className="profile navbar-desktop-cart-btn"
            style={{ textDecoration: "none" }}
          >
            Profile 👤
          </Link>
          {userInfo ? (
            <button
              className="logout navbar-desktop-cart-btn nav-login-custom-btn"
              onClick={handleLogout}
            >
              Logout 🔒
            </button>
          ) : (
            <button
              className="navbar-desktop-cart-btn nav-login-custom-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Login 🔓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesktopSearchBar;
