import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./CheckoutSuccess.css";
import { useCart } from "./CartContext";

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const [status, setStatus] = useState("verifying");
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage("Stripe session ID was not found.");
        return;
      }

      try {
        const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

        const token = storedUser.token;

        if (!token) {
          throw new Error("Authentication token was not found.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stripe/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              sessionId,
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to verify Stripe payment.");
        }

        setOrder(data.order);
        setStatus("success");

        clearCart();
      } catch (error) {
        console.error("STRIPE PAYMENT VERIFICATION ERROR:", error);

        setStatus("error");
        setErrorMessage(error.message || "Unable to verify your payment.");
      }
    };

    verifyPayment();
  }, [sessionId, clearCart]);

  if (status === "verifying") {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">
            <div className="checkout-success-spinner"></div>
          </div>

          <h1 className="checkout-success-title">Verifying Payment...</h1>

          <p className="checkout-success-message">
            Please wait while we confirm your Stripe payment and create your
            order.
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">❌</div>

          <h1 className="checkout-success-title">
            Payment Verification Failed
          </h1>

          <p className="checkout-success-message">{errorMessage}</p>

          <Link to="/" className="checkout-continue-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-success-page">
      <div className="checkout-success-card">
        <div className="checkout-success-icon">✓</div>

        <h1 className="checkout-success-title">Payment Successful!</h1>

        <p className="checkout-success-message">
          Your payment has been successfully verified and your order has been
          placed.
        </p>

        {order && (
          <>
            <div className="checkout-payment-reference">
              <span>Order ID</span>
              <strong>{order._id}</strong>
            </div>

            {order.stripeSessionId && (
              <div className="checkout-payment-reference">
                <span>Payment Reference</span>
                <strong>{order.stripeSessionId}</strong>
              </div>
            )}
          </>
        )}

        <Link to="/" className="checkout-continue-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
