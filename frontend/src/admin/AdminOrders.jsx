import React from "react";
import { useOrders, useUpdateOrderStatus,useDeleteOrder } from "../hooks/useOrders";
import "./AdminLayout.css";

export default function AdminOrders() {
  const { data: orders, isLoading, isError, error } = useOrders();
  const updateStatusMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate(
      { orderId, status: newStatus },
      {
        onSuccess: () => alert("Order status updated successfully! ✅"),
        onError: (err) => alert(`Error updating status: ${err.message}`),
      },
    );
  };
  const handleDeleteOrder = (orderId) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this order?"
);

if (!confirmDelete) return;

deleteOrderMutation.mutate(orderId, {
onSuccess: () => alert("Order deleted successfully! ✅"),
onError: (err) => alert(`Error deleting order: ${err.message}`),
});
};


  if (isLoading)
    return <div className="admin-loading">Loading Customer Orders... ⏳</div>;
  if (isError)
    return (
      <div className="admin-error">
        Error loading orders: {error.message} ❌
      </div>
    );

  return (
    <div className="admin-orders-page">
      <h2>Customer Orders Management</h2>
      <p className="admin-subtitle">
        Monitor incoming buyer checkouts, customer details, and update shipment
        progress.
      </p>
      <h3>Active Store Orders ({orders?.length || 0})</h3>
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Order ID / Date</th>
              <th>Customer Info</th>
              <th>Shipping Address</th>
              <th>Items & Total</th>
              <th>Current Status</th>
              <th className="text-center">Action Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>
                  <span className="order-id-code">#{order._id.slice(-6)}</span>
                  <div className="order-date-text">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className="font-semibold">{order.customerName}</div>
                  <div className="order-sub-text">{order.email}</div>
                  <div className="order-sub-text">{order.phone}</div>
                </td>
                <td className="shipping-address-cell">
                  {order.shippingAddress}
                </td>
                <td>
                  <div className="font-semibold">
                    ${order.totalAmount?.toFixed(2)}
                  </div>
                  <div className="order-sub-text">
                    {order.orderItems?.length || 0} items
                  </div>
                </td>
                <td>
                  <span className={`badge-tag ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-center">
                  <select
                    className="order-status-select"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                <button
type="button"
style={{
backgroundColor: "#fee2e2",
color: "#dc2626",
fontSize: "12px",
fontWeight: "600",
padding: "6px 12px",
border: "none",
borderRadius: "6px",
cursor: "pointer",
marginTop: "8px",
marginLeft: "8px",
}}
onClick={() => handleDeleteOrder(order._id)}

>

Delete </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
