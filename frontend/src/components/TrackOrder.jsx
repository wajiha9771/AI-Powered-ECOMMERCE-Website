import React, { useState } from "react";
import "./TrackOrder.css";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setShowStatus(true);
    }
  };

  return (
    <section className="track-section">
      <header className="track-header">
        <h1 className="track-main-title">Track Your Order</h1>
        <p className="track-subtitle">
          Enter your unique style reference number to check the real-time
          fulfillment and logistics status of your premium shipment.
        </p>
      </header>
      <div className="track-input-card">
        <form onSubmit={handleTrackSubmit} className="track-form">
          <div className="track-input-group">
            <label>Order ID / Tracking Number</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., NEX-4829-STYL"
              required
            />
          </div>
          <button type="submit" className="track-submit-btn">
            Track Shipment
          </button>
        </form>
      </div>
      {showStatus && (
        <div className="tracking-status-display-box">
          <div className="status-summary-header">
            <h3>
              Fulfillment Tracking: <span>{orderId.toUpperCase()}</span>
            </h3>
            <span className="status-badge-active">In Transit</span>
          </div>
          <div className="vertical-timeline-trail">
            <div className="timeline-node step-completed">
              <div className="node-icon-circle">✓</div>
              <div className="node-details">
                <h4>Order Placed & Secured</h4>
                <p>
                  Payment authorized successfully via digital channel
                  processing.
                </p>
                <span className="node-timestamp">Sept 30, 2026 - 10:24 AM</span>
              </div>
            </div>
            <div className="timeline-node step-completed">
              <div className="node-icon-circle">✓</div>
              <div className="node-details">
                <h4>Premium Quality Inspection Passed</h4>
                <p>
                  Fulfillment center experts verified style metrics and fabric
                  integrity parameters.
                </p>
                <span className="node-timestamp">Sep 31, 2026 - 02:15 PM</span>
              </div>
            </div>
            <div className="timeline-node step-active">
              <div className="node-icon-circle">🚚</div>
              <div className="node-details">
                <h4>Handed Over to Express Logistics Partners</h4>
                <p>
                  Package left regional sort facility hubs. Dispatched via
                  priority transit routes.
                </p>
                <span className="node-timestamp">
                  August 17, 2026 - 06:40 PM
                </span>
              </div>
            </div>
            <div className="timeline-node step-pending">
              <div className="node-icon-circle">🏠︎</div>
              <div className="node-details">
                <h4>Out for Out-of-Home Delivery</h4>
                <p>
                  Package arrives at destination center hubs for last-mile
                  delivery operations.
                </p>
                <span className="node-timestamp">Estimated: Sep 02, 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
