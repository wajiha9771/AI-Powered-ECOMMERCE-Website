import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function MobileSearchBar({
  searchOpen,
  setSearchOpen,
  voiceText,
  setVoiceText,
  isListening,
  handleVoiceSearch,
}) {
  if (!searchOpen) {
    return null;
  }
  const searchQuery = voiceText.trim();

  return (
    <div
      className="mobile-search-full-overlay"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="mobile-search-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-input-container-wrapper">
          <input
            type="text"
            placeholder={
              isListening
                ? "Listening🎙️Speak Now 🗣"
                : "Search your styles here.."
            }
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            autoFocus
          />

          {voiceText && (
            <button
              type="button"
              className="mobile-search-clear-svg-btn"
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
            className={`mobile-search-voice-svg-btn ${
              isListening ? "listening-pulse-active" : ""
            }`}
            title="AI Voice Search"
          >
            {isListening ? (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
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
        </div>

        <Link
          to={
            searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : "#"
          }
          onClick={() => {
            if (searchQuery) {
              setSearchOpen(false);
            }
          }}
          style={{ textDecoration: "none" }}
        >
          <button
            type="button"
            className="mobile-search-enter-btn"
            disabled={!searchQuery}
          >
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MobileSearchBar;
