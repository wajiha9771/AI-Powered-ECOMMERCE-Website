import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCMS } from "../hooks/useCMS";
import { useGlobalState } from "./GlobalStateContext";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import DesktopSearchBar from "./DesktopSearchBar";
import MobileSearchBar from "./MobileSearchBar";
import { useNotifications } from "./NotificationContext";
import "./Nav.css";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: cmsData } = useCMS();
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const { state } = useGlobalState();
  const { totalItems, openDrawer } = useCart();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("userInfo");

      if (storedUser) {
        try {
          setUserInfo(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid userInfo in localStorage:", error);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
    };

    checkUserSession();

    window.addEventListener("storage", checkUserSession);

    return () => {
      window.removeEventListener("storage", checkUserSession);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");

    setUserInfo(null);
    setShowLogoutModal(true);

    setTimeout(() => {
      setShowLogoutModal(false);
      window.location.href = "/";
    }, 2500);
  };
  const fullWebsiteName = cmsData?.websiteName || "Nex-Style";
  const websiteSlogan = cmsData?.websiteSlogan || "Styles that defines you.";

  const nameParts = fullWebsiteName.split("-");
  const firstPart = nameParts[0] || "Nex";
  const secondPart = nameParts[1] || "Style";

  // CUSTOM TOAST
  const showCustomToast = (msg) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // VOICE SEARCH

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Your browser is not supporting voice search. Please use GOOGLE CHROME!",
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceText(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  return (
    <>
      {/* LOGOUT SUCCESS MODAL */}

      {showLogoutModal && (
        <div className="custom-auth-overlay-backdrop">
          <div className="custom-auth-success-modal-card">
            <div className="modal-success-icon-badge">✓</div>
            <h3>Logged Out Successfully!</h3>
            <p>Cleaning up your secure session tokens, please wait...</p>
            <div className="modal-loading-dots-spinner"></div>
          </div>
        </div>
      )}
      {/* 
          NAVBAR */}
      <nav className="navbar-container sticky top-0 z-50 w-full bg-white border-b border-gray-100">
        {/* ANNOUNCEMENT BAR */}
        <div
          className="navbar-head w-full bg-[#bbb4ad] text-black text-center py-[5px] px-4 text-[14px] font-['sans-serif'] font-[800] tracking-wider uppercase"
          style={{ fontWeight: 800 }}
        >
          ⚡ SUMMER SALE | FLAT 50% OFF ON EVERYTHING | Limited Time Only!
        </div>
        {/* MAIN NAVBAR ROW */}
        <div className="navbar-top-row max-w-[1440px] mx-auto h-[75px] px-6 md:px-12 flex items-center justify-between bg-white text-black relative z-50">
          {/* LOGO */}
          <div className="navbar-logo">
            <span className="logo-text-custom">{firstPart}</span>
            {nameParts.length > 1 && (
              <span className="logo-dash-custom">-</span>
            )}
            <span className="logo-sub-custom">{secondPart}</span>
          </div>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="navbar-utilities-panel">
            <div className="navbar-links-group">
              <Link to="/" className="nav-link-anchor link-active">
                Home
              </Link>
              <Link to="/new-arrivals" className="nav-link-anchor">
                New Arrivals
              </Link>
              <Link to="/category/men" className="nav-link-anchor">
                Men
              </Link>
              <Link to="/category/women" className="nav-link-anchor">
                Women
              </Link>
              <Link to="/category/kids" className="nav-link-anchor">
                Kids
              </Link>
              <Link to="/category/accessories" className="nav-link-anchor">
                Accessories
              </Link>
            </div>
          </div>
          {/* ICONS */}
          <div className="navbar-utilities-panel">
            {/* SEARCH */}
            <button
              className="nav-utility-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" className="nav-svg-icon">
                <circle cx="11" cy="11" r="8"></circle>

                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* NOTIFICATIONS */}
            <button
              className="nav-utility-btn relative-badge-wrapper"
              title="Notifications"
              aria-label="Notifications"
              onClick={() => setNotificationOpen((prev) => !prev)}
            >
              <svg
                viewBox="0 0 24 24"
                className="nav-svg-icon"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>

              {unreadCount > 0 && (
                <span className="notification-badge-indicator">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            {notificationOpen && (
              <div className="notification-dropdown-panel">
                <div className="notification-dropdown-header">
                  <h3>Notifications</h3>

                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="notification-mark-all-btn"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="notification-dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="notification-empty-state">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>

                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          notification.read
                            ? "notification-read"
                            : "notification-unread"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-item-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 7L10 17l-5-5"></path>
                          </svg>
                        </div>

                        <div className="notification-item-content">
                          <p>{notification.message}</p>

                          <span>Order #{notification.orderId}</span>
                        </div>

                        {!notification.read && (
                          <span className="notification-unread-dot"></span>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="notification-dropdown-footer">
                    <button
                      onClick={clearNotifications}
                      className="notification-clear-btn"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* CART */}
            <button
              className="nav-utility-btn relative-badge-wrapper"
              onClick={openDrawer}
              title="Shopping Cart"
            >
              <svg viewBox="0 0 24 24" className="nav-svg-icon">
                <circle cx="9" cy="21" r="1"></circle>

                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge-indicator">{totalItems}</span>
              )}
            </button>

            {/* PROFILE */}
            <Link to="/profile" className="nav-utility-link" title="Profile">
              <svg viewBox="0 0 24 24" className="nav-svg-icon">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>

                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>

            {/* LOGIN / LOGOUT */}
            {userInfo ? (
              <button
                className="nav-utility-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <svg viewBox="0 0 24 24" className="nav-svg-icon">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            ) : (
              <button
                className="nav-utility-btn"
                onClick={() => (window.location.href = "/login")}
                title="Login"
              >
                <svg viewBox="0 0 24 24" className="nav-svg-icon">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </button>
            )}
          </div>
          {/* DESKTOP SEARCH BAR */}
          <DesktopSearchBar
            voiceText={voiceText}
            setVoiceText={setVoiceText}
            isListening={isListening}
            handleVoiceSearch={handleVoiceSearch}
            totalItems={totalItems}
            openDrawer={openDrawer}
            userInfo={userInfo}
            handleLogout={handleLogout}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
          {/* MOBILE ACTIONS */}
          <div className="navbar-mobile-actions">
            {/* HOME */}
            <Link to="/">
              <button className="mobile-action-btn" title="Home">
                <svg viewBox="0 0 24 24" className="mobile-svg-vector">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V9.5z" />
                </svg>
              </button>
            </Link>

            {/* SEARCH */}
            <button
              className="mobile-action-btn"
              title="Search"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg viewBox="0 0 24 24" className="mobile-svg-vector">
                <circle cx="11" cy="11" r="8" />

                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {/* NOTIFICATIONS */}
            <button
              className="mobile-action-btn mobile-badge-anchor"
              title="Notifications"
              aria-label="Notifications"
              onClick={() => setNotificationOpen((prev) => !prev)}
            >
              <svg
                viewBox="0 0 24 24"
                className="mobile-svg-vector"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>

              {unreadCount > 0 && (
                <span className="mobile-notification-badge">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            {/* CART */}
            <button
              className="mobile-action-btn mobile-badge-anchor"
              onClick={openDrawer}
              title="Shopping Cart"
            >
              <svg viewBox="0 0 24 24" className="mobile-svg-vector">
                <circle cx="9" cy="21" r="1"></circle>

                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span className="mobile-badge-counter-ui">{totalItems}</span>
              )}
            </button>

            {/* PROFILE / LOGIN */}
            <button
              className="mobile-action-btn"
              onClick={() => (window.location.href = "/login")}
              title="Login"
            >
              <svg viewBox="0 0 24 24" className="mobile-svg-vector">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>

                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            {/* MOBILE SEARCH */}
            <MobileSearchBar
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              voiceText={voiceText}
              setVoiceText={setVoiceText}
              isListening={isListening}
              handleVoiceSearch={handleVoiceSearch}
            />
            {/* HAMBURGER */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Sidebar Menu"
            >
              <span className="hamburger-stripe"></span>
              <span className="hamburger-stripe"></span>
              <span className="hamburger-stripe"></span>
            </button>
            {notificationOpen && (
              <div className="mobile-notification-panel">
                <div className="notification-dropdown-header">
                  <h3>Notifications</h3>

                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="notification-mark-all-btn"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="notification-dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="notification-empty-state">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>

                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          notification.read
                            ? "notification-read"
                            : "notification-unread"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-item-icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 7L10 17l-5-5"></path>
                          </svg>
                        </div>

                        <div className="notification-item-content">
                          <p>{notification.message}</p>

                          <span>Order #{notification.orderId}</span>
                        </div>

                        {!notification.read && (
                          <span className="notification-unread-dot"></span>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="notification-dropdown-footer">
                    <button
                      onClick={clearNotifications}
                      className="notification-clear-btn"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* MOBILE SIDEBAR  */}
          <div
            className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="sidebar-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              {/* SIDEBAR HEADER */}
              <div className="sidebar-header">
                <h3 className="sidebar-title-text">NEX-STYLE</h3>
                <button
                  className="sidebar-close-btn"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close Menu"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>

                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              {/* SIDEBAR NAVIGATION */}
              <div className="sidebar-categories-list">
                <ul className="sidebar-links-stack">
                  <li>
                    <Link
                      to="/"
                      className="sidebar-category-link link-item-active"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/new-arrivals"
                      className="sidebar-category-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category/men"
                      className="sidebar-category-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Men
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/category/women"
                      className="sidebar-category-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Women
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/category/kids"
                      className="sidebar-category-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Kids
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/category/accessories"
                      className="sidebar-category-link"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              {/* SIDEBAR PROFILE */}
              <div className="sidebar-profile-footer-panel">
                <Link
                  to="/profile"
                  className="sidebar-profile-anchor"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="profile-footer-svg"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Profile Account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* CART DRAWER */}
        <CartDrawer />
      </nav>
    </>
  );
}

export default Navbar;
