
import React from "react";
import "./HeroSlider.css";

export default function ServiceFeatures() {
  const features = [
    {
      title: "Free Shipping",
      subtitle: "On all orders over $100",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 6.5h11v10H3z" />
          <path d="M14 10h3.5l3.5 3.5v3H14z" />
          <circle cx="7" cy="18" r="1.6" />
          <circle cx="18" cy="18" r="1.6" />
        </svg>
      ),
    },
    {
      title: "Easy Returns",
      subtitle: "30 days return policy",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 11a8 8 0 1 1-2.35-5.65" />
          <path d="M20 4v6h-6" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      title: "Secure Payment",
      subtitle: "100% secure payment",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <path d="M7 14h4" />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      subtitle: "Dedicated support",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="service-features">
      <div className="service-features-container">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`service-feature ${
              index !== features.length - 1
                ? "service-feature-border"
                : ""
            }`}
          >
            <div className="service-feature-icon">
              {feature.icon}
            </div>

            <div className="service-feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

