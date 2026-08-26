import React from "react";
export default function PrivacyTerms() {
  return (
    <div className="policy-page-container mx-auto max-w-[1200px] px-10 py-[60px] font-['Poppins',sans-serif]">
      <header className="policy-hero-header">
        <h1 className="policy-main-title">Privacy & Cookies</h1>
        <p className="policy-subtitle">
          Securing your dynamic data and digital style footprint with ultimate
          precision.
        </p>
      </header>
      <div className="policy-content-grid">
        <div className="policy-text-card">
          <h3>Data Protection & Sovereignty 🔒</h3>
          <p>
            At Nex-Style, your identity security is handled at the absolute core
            level. Any credentials processing through our platform checkout
            gateways (Visa, Mastercard, Stripe, PayPal verification frameworks)
            undergo instant secure socket layer (SSL) end-to-end tokenization
            algorithms.
          </p>
          <p>
            We never store raw financial card details or personal tracking
            matrices inside our database warehouses, ensuring your digital
            transactions remain completely uncompromised.
          </p>
        </div>
        <div className="policy-text-card">
          <h3>Cookie Custom Preferences 🍪</h3>
          <p>
            Our active platform architecture uses essential analytical data
            crumbs to optimize responsive layout rendering. Cookies allow our
            engine to keep your items safe inside the{" "}
            <strong>Shopping Cart Side Drawer</strong> on refresh loops,
            remember voice search language parameters, and curate dynamic
            category preferences matching your wardrobe vision.
          </p>
        </div>
      </div>
    </div>
  );
}
