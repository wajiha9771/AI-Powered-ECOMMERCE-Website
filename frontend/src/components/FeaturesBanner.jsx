
import React from "react";
import "./HeroSlider.css";

export default function FeaturesBanner() {
  const features = [
    {
      title: "Trendy Designs",
      subtitle: "Latest trends",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
          <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
        </svg>
      ),
    },
    {
      title: "Premium Quality",
      subtitle: "Best quality",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 3l2.1 4.3 4.8.7-3.5 3.4.8 4.8-4.2-2.3-4.2 2.3.8-4.8-3.5-3.4 4.8-.7L12 3Z" />
          <path d="M8 16.5l-1 4.5 5-2 5 2-1-4.5" />
        </svg>
      ),
    },
    {
      title: "Affordable Price",
      subtitle: "For everyone",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.5 8.5c-.6-.6-1.5-1-2.5-1-1.4 0-2.5.8-2.5 1.9 0 1.2 1.2 1.6 2.5 2 1.3.4 2.5.8 2.5 2s-1.1 2-2.5 2c-1 0-1.9-.4-2.5-1" />
          <path d="M12 6.5v11" />
        </svg>
      ),
    },
    {
      title: "Happy Customers",
      subtitle: "100% satisfied",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8.5 12.5l2.2 2.2a2 2 0 0 0 2.8 0l4.8-4.8a2 2 0 0 0-2.8-2.8l-3.2 3.2" />
          <path d="M5.5 10.5l-1.3 1.3a2 2 0 0 0 0 2.8l4 4a2 2 0 0 0 2.8 0l1.2-1.2" />
          <path d="M8 8l-1.2-1.2a2 2 0 0 0-2.8 2.8l1.5 1.5" />
          <path d="M15.8 7.2l1.2-1.2a2 2 0 0 1 2.8 2.8l-1.5 1.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="box">
      <section className="features-banner">
        <div className="features-banner-container">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`feature-item ${
                index !== features.length - 1 ? "feature-item-border" : ""
              }`}
            >
              <div className="feature-icon">{feature.icon}</div>

              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

