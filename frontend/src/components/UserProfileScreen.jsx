import React from "react";
import { useUserOrders } from "../hooks/useOrders";

function UserProfileScreen() {
  const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userId = storedUser._id || storedUser.id;
  const userName = storedUser.name || "Valued Customer";
  const userEmail = storedUser.email || "No email provided";
  const { data: orders = [], isLoading, isError } = useUserOrders(userId);

  return (
    <div className="profile-page-wrapper mx-auto my-[40px] max-w-[900px] p-[30px] font-inherit">
      <div className="profile-header-card mb-[30px] rounded-[10px] border border-[#b1b2b6] bg-[#e8e7f0] p-[25px]">
        <h2 className="profile-title mb-[15px] text-[30px] text-[#1e3a8a]">
          My Account Profile 👤
        </h2>
        <p className="profile-text my-[8px] text-[20px] text-[#42454b]">
          <strong>Name:</strong> {userName}
        </p>
        <p className="profile-text my-[8px] text-[20px] text-[#42454b]">
          <strong>Email:</strong> {userEmail}
        </p>
      </div>
      <div className="profile-orders-container rounded-[10px] border border-[#b1b2b6] bg-[#e8e7f0] p-[25px]">
        <h3 className="orders-section-title mb-[20px] text-[30px] text-[#1e3a8a]">
          My Order History 📦
        </h3>
        {isLoading ? (
          <p className="profile-status-msg italic text-[#6b7280]">
            Loading your orders... ⏳
          </p>
        ) : isError ? (
          <p className="profile-error-msg italic text-[#dc2626]">
            Failed to load your orders. Try again later!
          </p>
        ) : orders.length === 0 ? (
          <p className="profile-status-msg italic text-[#6b7280]">
            You haven't placed any orders yet. Start shopping! 🛍️
          </p>
        ) : (
          <div className="orders-grid-list flex flex-col gap-[15px]">
            {orders.map((order) => (
              <div
                key={order._id}
                className="order-item-card rounded-[8px] border border-[#e5e7eb] bg-[#b4cfe9] p-[20px] transition-all duration-200 ease-in-out hover:border-[#d1d5db]"
              >
                <div className="order-card-top-row mb-[12px] flex items-center justify-between">
                  <span className="order-id-txt font-mono text-[18px] text-[#5b616e]">
                    Order ID: {order._id}
                  </span>

                  <span
                    className={`order-status-badge rounded-[20px] bg-[#fef3c7] px-[10px] py-[4px] text-[12px] font-bold text-[#d97706] ${order.status.toLowerCase() === "delivered" ? "delivered bg-[#d1fae5] text-[#059669]" : ""}`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="order-detail-txt my-[6px] text-[16px] text-[#444a53]">
                  <strong>Total Amount:</strong> $
                  {order.totalAmount?.toFixed(2)}
                </p>

                <p className="order-detail-txt my-[6px] text-[16px] text-[#444a53]">
                  <strong>Shipping Address:</strong> {order.shippingAddress}
                </p>

                <div className="order-items-summary mt-[10px] border-0 border-t-[1px] border-dashed border-[#65686e] pt-[8px] text-[13px] text-[#1f2937]">
                  <strong>Items:</strong>{" "}
                  {order.orderItems
                    ?.map((i) => `${i.name} (x${i.quantity})`)
                    .join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileScreen;
