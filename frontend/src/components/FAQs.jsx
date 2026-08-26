import React, { useState } from "react";
import "./FAQs.css";

const faqData = [
  {
    id: 1,
    question: "How long does shipping and international delivery take?",
    answer:
      "Standard international shipping takes 5-7 business days. Express logistics delivery options are available at checkout, reducing the delivery window to 2-3 business days. All orders include full end-to-end tracking details.",
  },
  {
    id: 2,
    question: "What is the Nex-Style return and exchange policy?",
    answer:
      "We offer a 30-day hassle-free return and exchange policy for all unworn apparel, cargo pants, and accessories with original tags attached. Simply access our returns portal in the footer to initiate a secure reverse pickup.",
  },
  {
    id: 3,
    question: "Are the sunglasses polarized and offer UV protection?",
    answer:
      "Yes, 100%! All sunglasses showcased on Nex-Style feature professional polarized lenses with full UV400 protection coating. They are engineered to block anti-glare while maintaining premium structural styling.",
  },
  {
    id: 4,
    question: "How can I track the exact status of my shipping order?",
    answer:
      "Once your package leaves our fulfillment center, you will receive a secure confirmation email and SMS containing a tracking link. You can also paste your order code directly into the 'Track Your Order' link in our footer.",
  },
  {
    id: 5,
    question: "What payment methods do you securely accept?",
    answer:
      "We support a wide array of premium secure checkout options including Visa, Mastercard, Stripe processing, and PayPal. All transactions are fully encrypted using standard secure socket layers (SSL) for ultimate data safety.",
  },
];

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faqs-section">
      <header className="faqs-header">
        <h1 className="faqs-main-title">Help & FAQs Center</h1>
        <p className="faqs-subtitle">
          Find quick answers to common queries regarding shipping, premium
          orders, and product styling operations.
        </p>
      </header>
      <div className="faqs-container">
        {faqData.map((faq, idx) => {
          const isOpen = activeIndex === idx;

          return (
            <div
              key={faq.id}
              className={`faq-accordion-item ${isOpen ? "active-panel" : ""}`}
            >
              <button
                className="faq-question-btn"
                onClick={() => toggleFAQ(idx)}
              >
                <span>{faq.question}</span>

                <svg
                  className={`faq-arrow-icon ${isOpen ? "rotated-arrow" : ""}`}
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
