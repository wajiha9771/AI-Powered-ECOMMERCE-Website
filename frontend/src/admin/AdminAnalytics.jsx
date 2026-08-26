import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import "./AdminLayout.css";

export default function AdminAnalytics() {
  const { data: logs, isLoading, isError, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="admin-loading">Loading AI & Click Analytics... ⏳</div>
    );
  }

  if (isError) {
    return (
      <div className="admin-error">
        Error loading analytics: {error.message} ❌
      </div>
    );
  }
  const analyticsLogs = logs || [];
  const totalActivities = analyticsLogs.length;
  const totalSearches = analyticsLogs.filter(
    (log) => log.eventType === "search",
  ).length;

  const totalClicks = analyticsLogs.filter(
    (log) => log.eventType === "click",
  ).length;

  const totalProductsViewed = analyticsLogs.filter(
    (log) =>
      log.eventType === "click" && log.meta?.includes("Product detail viewed"),
  ).length;

  return (
    <div className="admin-orders-page">
      <h2>AI & Click Analytics Dashboard</h2>
      <p className="admin-subtitle">
        Real-time tracking of customer search behaviors, product clicks, and AI
        interactions.
      </p>

      <div className="analytics-summary-grid">
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">🔎</div>
          <div>
            <p className="analytics-card-label">Total Searches</p>
            <h3 className="analytics-card-number">{totalSearches}</h3>
          </div>
        </div>
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">🖱️</div>
          <div>
            <p className="analytics-card-label">Product Clicks</p>
            <h3 className="analytics-card-number">{totalClicks}</h3>
          </div>
        </div>
        <div className="analytics-summary-card">
          <div className="analytics-card-icon">👀</div>

          <div>
            <p className="analytics-card-label">Products Viewed</p>
            <h3 className="analytics-card-number">{totalProductsViewed}</h3>
          </div>
        </div>

        <div className="analytics-summary-card">
          <div className="analytics-card-icon">📊</div>

          <div>
            <p className="analytics-card-label">Total Activities</p>
            <h3 className="analytics-card-number">{totalActivities}</h3>
          </div>
        </div>
      </div>
      <h3>Recent Activity Streams ({totalActivities})</h3>
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Target Identifier</th>
              <th>Metadata Context</th>
            </tr>
          </thead>
          <tbody>
            {analyticsLogs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No analytics activity found yet. 📊
                </td>
              </tr>
            ) : (
              analyticsLogs.map((log) => (
                <tr key={log._id}>
                  <td className="order-date-text">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`badge-tag ${
                        log.eventType === "click"
                          ? "processing"
                          : log.eventType === "search"
                            ? "shipped"
                            : "pending"
                      }`}
                    >
                      {log.eventType}
                    </span>
                  </td>
                  <td className="font-semibold">{log.target}</td>
                  <td className="order-sub-text">{log.meta || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
