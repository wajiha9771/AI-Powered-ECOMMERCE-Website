import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Invoice.css";

function Invoice() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invoice.");
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("INVOICE FETCH ERROR:", error);
        setError("Unable to load invoice.");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="invoice-status-page">
        <p className="invoice-loading-text">Loading invoice...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="invoice-status-page invoice-error-page">
        <p className="invoice-error-text">{error || "Invoice not found."}</p>

        <Link to="/profile" className="invoice-back-button">
          Back to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="invoice-wrapper">
      <div className="invoice-page">
        {/* Brand Header */}
        <div className="invoice-brand-bar">
          <div className="invoice-brand-content">
            <span className="invoice-brand-name">NEX-STYLE</span>

            <span className="invoice-brand-tagline">Fashion & E-Commerce</span>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="invoice-content">
          {/* Invoice Heading */}
          <div className="invoice-heading">
            <div className="invoice-heading-left">
              <p className="invoice-small-label">Official Invoice</p>

              <h1 className="invoice-title">INVOICE</h1>
            </div>

            <div className="invoice-heading-right">
              <p className="invoice-number">
                {order.invoiceNumber || "Invoice"}
              </p>

              <p className="invoice-date">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Customer and Order Information */}
          <div className="invoice-info-section">
            <div className="invoice-bill-section">
              <p className="invoice-section-label">Bill To</p>

              <p className="invoice-customer-name">{order.customerName}</p>

              <p className="invoice-info-text">{order.email}</p>

              <p className="invoice-info-text">{order.phone}</p>

              <p className="invoice-address">{order.shippingAddress}</p>
            </div>

            <div className="invoice-order-section">
              <p className="invoice-section-label">Order Information</p>

              <p className="invoice-info-text invoice-order-id">
                <span>Order ID:</span> {order._id}
              </p>

              <p className="invoice-info-text">
                <span>Payment:</span> {order.paymentMethod}
              </p>

              <p className="invoice-info-text">
                <span>Status:</span> {order.status}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="invoice-table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="invoice-item-column">Item</th>

                  <th className="invoice-qty-column">Qty</th>

                  <th className="invoice-price-column">Price</th>

                  <th className="invoice-total-column">Total</th>
                </tr>
              </thead>

              <tbody>
                {order.orderItems?.map((item, index) => (
                  <tr key={item.productId || index}>
                    <td className="invoice-item-name">{item.name}</td>

                    <td className="invoice-item-qty">{item.quantity}</td>

                    <td className="invoice-item-price">
                      ${Number(item.price || 0).toFixed(2)}
                    </td>

                    <td className="invoice-item-total">
                      $
                      {(
                        Number(item.price || 0) * Number(item.quantity || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="invoice-total-section">
            <div className="invoice-total-box">
              <span className="invoice-total-label">Total Amount</span>

              <span className="invoice-total-value">
                ${Number(order.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Thank You */}
          <div className="invoice-thank-you">
            <p className="invoice-thank-you-title">
              Thank you for shopping with Nex-Style.
            </p>

            <p className="invoice-thank-you-text">
              We appreciate your business.
            </p>
          </div>

          {/* Buttons */}
          <div className="invoice-actions">
            <Link to="/profile" className="invoice-profile-button">
              Back to Profile
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="invoice-print-button"
            >
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
