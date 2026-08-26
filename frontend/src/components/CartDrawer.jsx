import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useCreateOrder } from "../hooks/useOrders";
import "./CartDrawer.css";
import "./Navbar.css";

function CartDrawer() {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    drawerTab,
    setDrawerTab,
  } = useCart();

  const { mutate: placeOrder, isLoading: isPlacingOrder } = useCreateOrder();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState("");
  if (!isDrawerOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
    const currentUserId = storedUser._id || storedUser.id;
    const orderPayload = {
      userId: currentUserId,
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      shippingAddress: formData.shippingAddress,

      orderItems: cartItems.map((item) => ({
        productId: item._id || item.id,
        name: item.name,
        price: Number(item.price),
        quantity: item.qty,
        image: item.images?.[0] || "",
      })),

      totalAmount: totalPrice,
    };

    placeOrder(orderPayload, {
      onSuccess: (responseData) => {
        const trackId =
          responseData?._id ||
          responseData?.orderId ||
          "ORD-" + Math.floor(1000 + Math.random() * 9000);
        setGeneratedTrackingCode(trackId);
        clearCart();
        setIsCheckingOut(false);
        setFormData({ name: "", email: "", phone: "", shippingAddress: "" });
        setShowOrderSuccess(true);
      },
      onError: (err) => {
        alert(`Order failed: ${err.message || "Validation Error"} ❌`);
      },
    });
  };

  const handleConfirmClear = () => {
    clearCart();
    setShowConfirm(false);
  };

  return (
    <div className="cart-sidebar-overlay active" onClick={closeDrawer}>
      <div className="cart-sidebar-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-sidebar-header">
          <div className="drawer-tabs-nav-bar">
            <button
              type="button"
              className={`drawer-tab-link-btn ${drawerTab === "cart" ? "active-tab-indicator" : ""}`}
              onClick={() => {
                setDrawerTab("cart");
                setIsCheckingOut(false);
              }}
            >
              Cart 🛍️
            </button>
            <button
              type="button"
              className={`drawer-tab-link-btn ${drawerTab === "track" ? "active-tab-indicator" : ""}`}
              onClick={() => setDrawerTab("track")}
            >
              Track 🚚
            </button>
            <button
              type="button"
              className={`drawer-tab-link-btn ${drawerTab === "shipping" ? "active-tab-indicator" : ""}`}
              onClick={() => setDrawerTab("shipping")}
            >
              Ship 📦
            </button>
          </div>
          <button
            type="button"
            className="cart-sidebar-close-btn"
            onClick={closeDrawer}
          >
            &times;
          </button>
        </div>
        <div className="cart-sidebar-body">
          {drawerTab === "cart" && (
            <div className="tab-body-view-wrapper">
              {isCheckingOut ? (
                <div className="checkout-form-container">
                  <h4 className="drawer-content-inline-title">
                    Secure Checkout 🔒
                  </h4>
                  <form
                    className="drawer-embedded-form"
                    onSubmit={handleFormSubmit}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="drawer-custom-input"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="drawer-custom-input"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="drawer-custom-input"
                      required
                    />
                    <textarea
                      name="shippingAddress"
                      placeholder="Complete Shipping Address"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className="drawer-custom-input drawer-custom-textarea"
                      rows="3"
                      required
                    />
                    <div className="checkout-form-buttons-row">
                      <button
                        type="button"
                        className="clear-cart-action-btn"
                        onClick={() => setIsCheckingOut(false)}
                      >
                        Back to Cart
                      </button>
                      <button
                        type="submit"
                        className="proceed-checkout-btn"
                        disabled={isPlacingOrder}
                      >
                        {isPlacingOrder
                          ? "Processing... ⏳"
                          : `Pay & Order $${totalPrice.toFixed(2)}`}
                      </button>
                    </div>
                  </form>
                </div>
              ) : cartItems.length === 0 ? (
                <p className="empty-cart-msg">
                  Your cart is empty. Start your Shopping! 🛍️
                </p>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="cart-item">
                      <img
                        src={
                          item.images && item.images[0]
                            ? item.images[0]
                            : "https://placeholder.com"
                        }
                        alt={item.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-details-panel">
                        <h4 className="cart-item-product-name">{item.name}</h4>
                        <p className="cart-item-product-price">
                          {typeof item.price === "string" &&
                          item.price.includes("$")
                            ? item.price
                            : `$${item.price}`}
                        </p>

                        <div className="qty-control">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item._id || item.id)
                            }
                            className="qty-btn"
                          >
                            -
                          </button>
                          <span className="qty-number-display">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="qty-btn"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item._id || item.id)}
                          title="Remove item"
                        >
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
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/*  LIVE TRACKING COMPONENT BLOCK */}
          {drawerTab === "track" && (
            <div className="tab-body-view-wrapper drawer-tracking-inner-panel">
              <h4 className="drawer-content-inline-title">Track Shipment</h4>

              <form
                className="drawer-embedded-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!trackingInput.trim()) return;
                  setTrackingResult({
                    code: trackingInput,
                    status: "Pending ⏱️",
                    location: "Main Logistics Center Hub",
                    updatedAt: "Just Now",
                  });
                }}
              >
                <input
                  type="text"
                  name="trackingInput"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g., paste your tracking reference here"
                  className="drawer-custom-input"
                  required
                />
                <button type="submit" className="drawer-embedded-submit-btn">
                  Search Status
                </button>
              </form>
              {trackingResult && (
                <div className="tracking-status-result-card">
                  <div className="tracking-status-header-row">
                    <span className="tracking-lbl">Order Ref:</span>
                    <span className="tracking-val-code">
                      {trackingResult.code}
                    </span>
                  </div>
                  <div className="tracking-status-info-row">
                    <div className="tracking-info-item">
                      <p className="tracking-info-lbl">Current Status</p>
                      <h5 className="tracking-info-val status-highlight-text">
                        {trackingResult.status}
                      </h5>
                    </div>
                    <div className="tracking-info-item">
                      <p className="tracking-info-lbl">Current Location</p>
                      <h5 className="tracking-info-val">
                        {trackingResult.location}
                      </h5>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="clear-tracking-btn"
                    onClick={() => {
                      setTrackingResult(null);
                      setTrackingInput("");
                    }}
                  >
                    Clear Search
                  </button>
                </div>
              )}

              <div className="drawer-mini-info-alert">
                <p>
                  Enter your unique reference number inside the frame tracker
                  axis above to process parcel coordinates updates.
                </p>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {drawerTab === "shipping" && (
            <div className="tab-body-view-wrapper drawer-shipping-inner-panel">
              <h4 className="drawer-content-inline-title">
                Global Delivery Logistics
              </h4>

              <div className="shipping-options-container">
                <div className="drawer-shipping-stat-row standard-row">
                  <div className="shipping-row-header">
                    <h5>Standard Ground Shipping</h5>
                    <span className="shipping-price-lbl free-text">FREE</span>
                  </div>
                  <p className="shipping-delivery-time">
                    ⏱ 5 - 7 Business Days tracking delivery matrix.
                  </p>
                  <span className="shipping-badge-info">Best Value</span>
                </div>
                <div className="drawer-shipping-stat-row active-express-row">
                  <div className="shipping-row-header">
                    <h5>Priority Air Cargo</h5>
                    <span className="shipping-price-lbl">$15.00</span>
                  </div>
                  <p className="shipping-delivery-time">
                    ⏱ 2 - 3 Express Logistics business routing days.
                  </p>
                  <span className="shipping-badge-info express-badge">
                    Fastest
                  </span>
                </div>
                <div className="drawer-shipping-stat-row international-row">
                  <div className="shipping-row-header">
                    <h5>Next-Day Courier</h5>
                    <span className="shipping-price-lbl">$29.99</span>
                  </div>
                  <p className="shipping-delivery-time">
                    ⏱ 24 Hours absolute premium parcel delivery dispatch.
                  </p>
                </div>
              </div>
              <div className="drawer-mini-info-alert logistics-notice-box">
                <p>
                  {" "}
                  All parcels are backed by international tracking insurance
                  networks. Real-time updates automatically sync with your{" "}
                  <strong>Track tab</strong> once packages pass through our
                  regional cargo scanners.
                </p>
              </div>
            </div>
          )}
        </div>
        {/* FOOTER SECTION */}
        {drawerTab === "cart" && !isCheckingOut && (
          <div className="cart-sidebar-footer">
            <div className="cart-total-box">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer-actions-layout">
                <button
                  className="clear-cart-action-btn"
                  type="button"
                  onClick={() => setShowConfirm(true)}
                >
                  Clear All 🗑️
                </button>
                <button
                  className="proceed-checkout-btn"
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}
        {/* CONFIRMATION MODAL */}
        {showConfirm && (
          <div className="custom-confirm-overlay">
            <div className="custom-confirm-card">
              <h4 className="custom-confirm-title">Are you sure? </h4>
              <p className="custom-confirm-text">
                Do you really want to remove all items from your cart?
              </p>
              <div className="custom-confirm-buttons">
                <button
                  className="confirm-btn-cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-btn-danger"
                  onClick={handleConfirmClear}
                >
                  Yes, Clear!
                </button>
              </div>
            </div>
          </div>
        )}

        {showOrderSuccess && (
          <div className="custom-confirm-overlay">
            <div className="custom-confirm-card success-confirm-card">
              <h4 className="custom-confirm-title success-confirm-title">
                Order Placed!{" "}
              </h4>
              <p className="custom-confirm-text">
                Your transaction assets have been saved
              </p>
              <div
                className="tracking-display-box"
                style={{
                  margin: "15px 0",
                  padding: "10px",
                  background: "#f5f5f5",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Copy your Tracking Reference:{" "}
                <span style={{ color: "#1c1d75", margin: "5px" }}>
                  {generatedTrackingCode}
                </span>
              </div>

              <div className="custom-confirm-buttons success-confirm-buttons">
                <button
                  className="confirm-btn-cancel success-action-btn"
                  onClick={() => {
                    setShowOrderSuccess(false);
                    closeDrawer();
                  }}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
