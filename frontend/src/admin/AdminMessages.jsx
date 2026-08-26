import React from "react";
import {
  useContactMessages,
  useDeleteContactMessage,
} from "../hooks/useContacts";
import "./AdminLayout.css";

export default function AdminMessages() {
  const { data: messages, isLoading, isError, error } = useContactMessages();

  const deleteMessageMutation = useDeleteContactMessage();
  const handleDelete = (messageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;
    deleteMessageMutation.mutate(messageId, {
      onSuccess: () => {
        alert("Message deleted successfully! 🗑️");
      },
      onError: (err) => {
        alert(`Error deleting message: ${err.message}`);
      },
    });
  };
  if (isLoading) {
    return <div className="admin-loading">Loading Contact Messages... ⏳</div>;
  }
  if (isError) {
    return (
      <div className="admin-error">
        Error loading messages: {error.message} ❌
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <h2>Customer Contact Messages</h2>

      <p className="admin-subtitle">
        View messages and inquiries submitted through the Contact Us form.
      </p>
      <h3>Total Messages ({messages?.length || 0})</h3>
      {messages?.length === 0 ? (
        <div className="admin-empty-state rounded-[12px] border border-[#d1d5db] bg-white p-[30px] text-center text-[15px] text-[#6b7280]">
          No contact messages found.
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Info</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages?.map((contact) => (
                <tr key={contact._id}>
                  <td>
                    <span className="order-id-code">
                      #{contact._id.slice(-6)}
                    </span>
                    <div className="order-date-text">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    <div className="order-sub-text">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </div>
                  </td>

                  <td>
                    <div className="font-semibold">{contact.name}</div>
                  </td>

                  <td>
                    <div className="order-sub-text">{contact.email}</div>
                  </td>

                  <td>
                    <div className="font-semibold">{contact.subject}</div>
                  </td>

                  <td className="shipping-address-cell">
                    <div className="max-w-[350px] whitespace-normal break-words">
                      {contact.message}
                    </div>
                  </td>

                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(contact._id)}
                      disabled={deleteMessageMutation.isPending}
                      className="cursor-pointer rounded-[8px] border-none bg-[#dc2626] px-[12px] py-[8px] text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-[#b91c1c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleteMessageMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
