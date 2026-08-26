import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCMS } from "../hooks/useCMS";
import { useGlobalState } from "./GlobalStateContext";
import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";
import DesktopSearchBar from "./DesktopSearchBar";
import MobileSearchBar from "./MobileSearchBar";
import "./Navbar.css";
import logoIcon from "../assets/nex-style-.png";

function Navbar() {
  const { data: cmsData } = useCMS();
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      } else {
        setUserInfo(null);
      }
    };

    checkUserSession();
    window.addEventListener("storage", checkUserSession);
    return () => window.removeEventListener("storage", checkUserSession);
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
  const { totalItems, openDrawer } = useCart();
  const [toastMessage, setToastMessage] = useState(null);
  const showCustomToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { state } = useGlobalState();
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");

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
      <nav className="navbar-container block w-full max-w-full h-[200px] bg-[#0f172a] box-border">
        <div className="navbar-head w-full bg-[#1e1b4b] text-[#f3f4f6] text-center py-[10px] px-[16px] text-[13px] font-normal tracking-[1px] box-border font-['Poppins',_sans-serif]">
          Welcome to{" "}
          <span className="brand-highlight font-['Playfair_Display',_'Georgia',_serif] font-bold italic text-[#fbbf24] tracking-[0.5px] px-[4px]">
            Nex-Style
          </span>{" "}
          | Get{" "}
          <span className="offer-highlight font-bold text-[#38bdf8] bg-[rgba(56,_189,_248,_0.1)] py-[2px] px-[6px] rounded-[4px]">
            10% OFF
          </span>{" "}
          on Your First Order 🛍️
        </div>

        <div className="navbar-head1 w-full bg-[#e0e7ff] text-[#1e3a8a] py-[8px] px-0 text-[12px] font-[600] tracking-[0.5px] overflow-hidden flex">
          <div className="navbar-track flex whitespace-nowrap gap-[30px] animate-continuous-loop">
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
            <span className="inline-block pr-[20px]">
              Fast shipping on all orders. ✨{" "}
            </span>
          </div>
        </div>
        <div className="navbar-head2">
          <div className="navbar-desktop-container">
            <div className="navbar-top-row">
              <div className="navbar-logo">
                <span className="logo-text text-[46px] font-semibold text-[#fbbf24] tracking-[0.5px]">
                  {firstPart}
                </span>
                {nameParts.length > 1 && (
                  <span className="logo-dash text-[46px] font-semibold text-[#38bdf8] px-[2px]">
                    -
                  </span>
                )}
                <span className="logo-sub text-[46px] font-semibold text-[#fbbf24] tracking-[0.5px]">
                  {secondPart}
                </span>
                <span className="logo-icon">
                  <img
                    src={logoIcon}
                    alt="Nex Style Logo"
                    className="logo-img"
                  />
                </span>
                <div className="logo-lines text-[15px] font-light italic text-[#38bdf8] tracking-[0.5px] ml-[5px] mb-[5px]">
                  {websiteSlogan}
                </div>
              </div>
              <div className="navbar-desktop-links">
                <Link to="/" className="link-item">
                  Home
                </Link>
                <Link to="/new-arrivals" className="link-item">
                  New Arrivals
                </Link>
                <Link to="/category/men" className="link-item">
                  Men
                </Link>
                <Link to="/category/women" className="link-item">
                  Women
                </Link>
                <Link to="/category/kids" className="link-item">
                  Kids
                </Link>
                <Link to="/category/accessories" className="link-item">
                  Accessories
                </Link>
              </div>
            </div>

            <div className="navbar-mobile-actions">
              <Link to="/">
                <button className="mobile-action-btn" title="Home">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V9.5z" />
                  </svg>
                </button>
              </Link>
              <button
                className="mobile-action-btn"
                title="Search"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <button
                className="mobile-action-btn mobile-cart-badge-btn"
                onClick={openDrawer}
                title="Shopping Cart"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
              <button
                className="mobile-action-btn"
                onClick={() => (window.location.href = "/login")}
                title="Login"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <MobileSearchBar
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                voiceText={voiceText}
                setVoiceText={setVoiceText}
                isListening={isListening}
                handleVoiceSearch={handleVoiceSearch}
              />
              <button
                className="mobile-hamburger-btn"
                onClick={() => setSidebarOpen(true)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <DesktopSearchBar
              voiceText={voiceText}
              setVoiceText={setVoiceText}
              isListening={isListening}
              handleVoiceSearch={handleVoiceSearch}
              totalItems={totalItems}
              openDrawer={openDrawer}
              userInfo={userInfo}
              handleLogout={handleLogout}
            />
          </div>
        </div>

        {/* Categories Sidebar Drawer */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        >
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h3>Categories</h3>
              <button
                className="sidebar-close-btn"
                onClick={() => setSidebarOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="sidebar-categories-list">
              <ul className="flex flex-col gap-3">
                <li>
                  {" "}
                  <Link
                    to="/"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    to="/category/men"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Men
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    to="/category/women"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Women
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    to="/new-arrivals"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    to="/category/kids"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Kids
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link
                    to="/category/accessories"
                    className="category-item"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sidebar-profile-section  border-b border-gray-200 pb-4 mb-4">
              <Link to="/profile">
                <span
                  className="sidebar-profile-link  inline-flex items-center gap-2 text-base font-bold text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  👤 My Profile
                </span>
              </Link>
            </div>
          </div>
        </div>
        <CartDrawer />
      </nav>
    </>
  );
}

export default Navbar;
