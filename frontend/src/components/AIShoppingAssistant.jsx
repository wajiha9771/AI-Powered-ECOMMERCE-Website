import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAIChat } from "../hooks/useAIChat";
import { useCart } from "./CartContext";
import "./AIShoppingAssistant.css";

export default function AIShoppingAssistant() {
const [isOpen, setIsOpen] = useState(false);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
const { mutate: sendMessage, isPending } = useAIChat();
const { addToCart } = useCart();

const handleAddToCart = (product) => {
const numericPrice =
typeof product.price === "string"
? parseFloat(product.price.replace("$", ""))
: Number(product.price);


addToCart({
  ...product,
  price: numericPrice,
});


};

const handleSendMessage = () => {
const trimmedMessage = message.trim();


if (!trimmedMessage || isPending) return;

setMessages((prev) => [
  ...prev,
  {
    role: "user",
    text: trimmedMessage,
  },
]);

setMessage("");

sendMessage(trimmedMessage, {
  onSuccess: (data) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text:
          data.reply ||
          data.message ||
          "Here are the products I found for you:",
        products: data.products || [],
        filters: data.filters,
      },
    ]);
  },

  onError: (error) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text:
          error.message ||
          "Sorry, something went wrong. Please try again.",
      },
    ]);
  },
});


};

const handleKeyDown = (e) => {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
handleSendMessage();
}
};

return (
<>
{/* FLOATING AI BUTTON */}
{!isOpen && (
<button
type="button"
className="ai-floating-button"
onClick={() => setIsOpen(true)}
aria-label="Open AI Shopping Assistant"
> <span className="ai-floating-icon">🤖</span> <span className="ai-floating-text">Ask AI</span> </button>
)}


  {isOpen && (
    <div className="ai-chat-window">
      <div className="ai-chat-header">
        <div className="ai-chat-header-info">
          <div className="ai-chat-avatar">🤖</div>

          <div>
            <h3>Nex-Style AI</h3>
            <span>Shopping Assistant</span>
          </div>
        </div>

        <button
          type="button"
          className="ai-close-button"
          onClick={() => setIsOpen(false)}
          aria-label="Close AI Assistant"
        >
          ✕
        </button>
      </div>

      <div className="ai-chat-messages">
        {messages.length === 0 && (
          <div className="ai-welcome">
            <div className="ai-welcome-icon">🤖</div>

            <h4>Hi! I'm your AI Shopping Assistant</h4>

            <p>
              Tell me what you're looking for and I'll help you find it.
            </p>

            <div className="ai-suggestions">
              <button
                type="button"
                onClick={() =>
                  setMessage("Show me black shirts under 3000")
                }
              >
                👕 Black shirts
              </button>

              <button
                type="button"
                onClick={() => setMessage("Show me affordable shoes")}
              >
                👟 Affordable shoes
              </button>

              <button
                type="button"
                onClick={() => setMessage("Show me new arrivals")}
              >
                ✨ New arrivals
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ai-message-row ${
              msg.role === "user" ? "user" : "ai"
            }`}
          >
            <div
              className={`ai-message ${
                msg.role === "user" ? "user" : "ai"
              }`}
            >
              <p>{msg.text}</p>

              {msg.role === "ai" && msg.products?.length > 0 && (
                <div className="ai-products">
                  {msg.products.map((product) => (
                    <div
                      key={product._id}
                      className="ai-product-card"
                    >
                      <div className="ai-product-image-box">
                        {product.badge && (
                          <span className="ai-product-badge">
                            {product.badge}
                          </span>
                        )}

                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="ai-product-image"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      <div className="ai-product-details">
                        <span className="ai-product-category">
                          {product.category}
                        </span>

                        <h4>{product.name}</h4>

                        <div className="ai-product-price">
                          <strong>${product.price}</strong>

                          {product.oldPrice && (
                            <span>${product.oldPrice}</span>
                          )}
                        </div>

                        <div className="ai-product-buttons">
                          <Link
                            to={`/product/${product._id}`}
                            className="ai-view-button"
                            onClick={() => setIsOpen(false)}
                          >
                            View
                          </Link>

                          <button
                            type="button"
                            className="ai-cart-button"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.role === "ai" &&
                msg.products &&
                msg.products.length === 0 &&
                msg.filters?.intent === "product_search" && (
                  <p className="ai-no-products">
                    Sorry, I couldn't find matching products.
                  </p>
                )}
            </div>
          </div>
        ))}

        {isPending && (
          <div className="ai-message-row ai">
            <div className="ai-loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="ai-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={isPending}
        />

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!message.trim() || isPending}
          className="ai-send-button"
        >
          ➤
        </button>
      </div>
    </div>
  )}
</>


);
}
