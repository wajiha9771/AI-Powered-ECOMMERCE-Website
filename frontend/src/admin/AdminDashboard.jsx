import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useOrders } from "../hooks/useOrders";
import { useContactMessages } from "../hooks/useContacts";
import { useAnalyticsSummary } from "../hooks/useAnalytics";
import "./AdminLayout.css";

export default function AdminDashboard() {
  const { data: products = [], isLoading: productsLoading } = useProducts();

  const { data: orders = [], isLoading: ordersLoading } = useOrders();

  const { data: messages = [], isLoading: messagesLoading } =
    useContactMessages();

  const { data: analyticsSummary, isLoading: analyticsLoading } =
    useAnalyticsSummary();

  return (
    <div className="admin-orders-page">
      <h2>Dashboard Overview</h2>

      <p className="admin-subtitle">Welcome to Nex-Style Admin Dashboard</p>
      <div className="analytics-summary-grid">
        {/* TOTAL PRODUCTS */}
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">🛍️</div>
          <div>
            <p className="analytics-card-label">Total Products</p>
            <h3 className="analytics-card-number">
              {productsLoading ? "..." : products.length}
            </h3>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">📦</div>
          <div>
            <p className="analytics-card-label">Total Orders</p>
            <h3 className="analytics-card-number">
              {ordersLoading ? "..." : orders.length}
            </h3>
          </div>
        </div>

        {/* TOTAL MESSAGES */}
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">💬</div>
          <div>
            <p className="analytics-card-label">Total Messages</p>

            <h3 className="analytics-card-number">
              {messagesLoading ? "..." : messages.length}
            </h3>
          </div>
        </div>

        {/* TOTAL VIEWS */}
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">👁️</div>

          <div>
            <p className="analytics-card-label">Total Views</p>

            <h3 className="analytics-card-number">
              {analyticsLoading ? "..." : analyticsSummary?.totalViews || 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
