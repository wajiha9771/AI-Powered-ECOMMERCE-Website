import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="admin-container flex h-screen bg-[#f1f2f6] font-sans">
      <aside className="admin-sidebar w-[260px] bg-[#1a1a1a] flex flex-col">
        <div className="admin-brand">
          <h2>
            Nex-Style <span className="text-[#38bdf8] text-[16px]">Admin</span>
          </h2>
        </div>
        <nav
          className={`admin-nav flex flex-col py-[15px] ${
            mobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <button
            className="admin-drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✕
          </button>
          <Link to="/admin/dashboard" className="admin-nav-link">
            📊 OverView
          </Link>

          <Link to="/admin/dashboard/products" className="admin-nav-link">
            🛍️ Products (CRUD)
          </Link>

          <Link to="/admin/dashboard/cms" className="admin-nav-link">
            🎨 Store CMS & HeroSliders
          </Link>

          <Link to="/admin/dashboard/orders" className="admin-nav-link">
            📦 Orders & Tracking
          </Link>

          <Link to="/admin/dashboard/messages" className="admin-nav-link">
            💬 Contact Messages
          </Link>

          <Link to="/admin/dashboard/analytics" className="admin-nav-link">
            📈 AI & Click Analytics
          </Link>
        </nav>
      </aside>
      <main className="admin-content">
        <header className="admin-topbar">
          <button
            className="admin-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <h2>Nex-Style</h2>
          <span className="admin-badge-role bg-[#e8f4fd] text-[#000000] px-[12px] py-[5px] rounded-[20px] text-[13.6px] font-semibold">
            Owner
          </span>
        </header>
        <div className="admin-page-view p-[30px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
