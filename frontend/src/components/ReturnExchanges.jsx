import React from "react";
export default function ReturnsExchanges() {
  return (
    <div className="policy-page-container max-w-[1200px] mx-auto py-[60px] px-[40px] font-['Poppins',sans-serif] max-[768px]:py-[30px] max-[768px]:px-[15px]">
      <header className="policy-hero-header text-center mb-[50px]">
        <h1 className="policy-main-title text-[50px] font-[700] text-[ rgb(13, 13, 13)] mb-[4px] max-[768px]:text-[32px]">
          Returns & Exchanges
        </h1>
        <p className="policy-subtitle text-[20px] text-[rgb(105,103,103)] max-w-[700px] mx-auto max-[768px]:text-[15px]">
          Hassle-free reverse logistics engineered to guarantee your ultimate
          satisfaction.
        </p>
      </header>
      <div className="policy-content-grid flex flex-col gap-[25px] max-w-[900px] mx-auto">
        <div className="policy-text-card border border-[#c9c9ca] bg-[rgb(219, 215, 215)]   rounded-[25px] p-[35px] max-[768px]:p-[22px]">
          <h3 className="text-[22px] font-[700] text-[ rgb(13, 13, 13)] m-0 mb-[15px]">
            The 30-Day Nex-Style Guarantee 🔄
          </h3>
          <p className="text-[15px] text-[#5e5c5c] leading-[1.7] mb-[15px]">
            If your premium apparel, cargo pants, or luxury accessories don't
            align perfectly with your fit expectations, you can return or
            exchange the items within 30 days of shipment delivery.
          </p>
          <ul className="pl-[20px] text-[#5e5c5c] text-[14.5px] leading-[1.8]">
            <li>
              Items must be unworn, unwashed, and inside original packaging
              matrices.
            </li>
            <li>
              All custom product tags and authenticity badges must remain
              attached securely.
            </li>
            <li>
              Footwear/Sunglasses must be immaculate with zero abrasive surface
              marks.
            </li>
          </ul>
        </div>
        <div className="policy-text-card  border border-[#c9c9ca] bg-[rgb(219, 215, 215)]   rounded-[25px] p-[35px] max-[768px]:p-[22px]">
          <h3 className="text-[22px] font-[700] text-[ rgb(13, 13, 13)] m-0 mb-[15px]">
            How to Initiate a Return? 🛒
          </h3>
          <p className="text-[15px] text-[#5e5c5c] leading-[1.7] mb-[15px]">
            To activate a reverse logistic loop, simply access your dynamic{" "}
            <strong>Track Your Order</strong> side drawer from the footer, enter
            your order ID reference numbers, and hit 'Request Return'.
          </p>
          <p className="text-[15px] text-[#5e5c5c] leading-[1.7] mb-[15px]">
            Our express logistics partners will manage a reverse doorstep pickup
            operation within 24-48 hours with zero shipping liability onto your
            grid. Refunds process back directly to your secure payment channels
            (Visa, PayPal, Stripe) instantly upon warehouse inspection
            authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
