import React from "react";

export default function About() {
  return (
    <div className="about-page-wrapper mx-auto max-w-[1200px] px-[15px] py-[30px] md:px-10 md:py-[60px] font-['Poppins',sans-serif] text-[#0f172a] bg-[#ebf0f5]">
      <header className="about-hero mb-[50px] rounded-[20px] border border-[#9ab4d4] bg-[#c4d7ec] p-[10px] text-center">
        <h1 className="about-main-title mb-3 text-[36px] font-extrabold text-[#1c095e] md:text-[45px]">
          About Us
        </h1>
        <p className="about-tagline mx-auto max-w-[600px] text-[15px] text-[#5a6a80] md:text-[18px]">
          Redefining modern luxury through AI-driven style orchestration.
        </p>
      </header>
      <section className="about-content-row mx-auto mb-[60px] max-w-[800px] leading-[1.8]">
        <div className="about-text-block">
          <h2 className="mb-5 text-[32px] font-bold text-[#050646]">
            The <span className="brand-nex">Nex</span>
            <span className="brand-dash mx-[1px] font-extrabold text-[#0ea5e9]">
              -
            </span>
            <span className="brand-style">Style</span> Vision
          </h2>
          <p className="mb-5 text-[16px] text-[#475569]">
            Founded in 2026, Nex-Style emerged at the intersection of haute
            couture and vanguard tech. We believe that clothing is not merely
            fabric—it is an external expression of individual identity. Our
            mission is to bypass traditional fashion constraints and deliver
            curated luxury directly to your screen.
          </p>
          <p className="mb-5 text-[16px] text-[#475569]">
            Every silhouette, material choices, and hardware specifications are
            tailored to align with contemporary international standards,
            ensuring you stay ahead of the style curve effortlessly.
          </p>
        </div>
      </section>
      <section className="about-values-grid grid grid-cols-1 gap-[15px] md:grid-cols-3 md:gap-[30px]">
        {/* Card 1 */}
        <div className="value-stat-card rounded-[20px] border-2 border-[#5e5c5c] bg-[#e5e7ee] p-[30px] text-center transition-transform duration-300 ease-in-out hover:-translate-y-[5px]">
          <span className="stat-number mb-[10px] block text-[40px] font-extrabold text-[#1c095e]">
            100%
          </span>
          <h4 className="mb-[10px] text-[18px] font-bold text-[#050646]">
            Premium Quality
          </h4>
          <p className="text-[14px] leading-[1.5] text-[#5e5c5c]">
            Handpicked, high-density textiles crafted for resilience and
            timeless elegance.
          </p>
        </div>

        {/* Card 2 */}
        <div className="value-stat-card rounded-[20px] border-2 border-[#5e5c5c] bg-[#e5e7ee] p-[30px] text-center transition-transform duration-300 ease-in-out hover:-translate-y-[5px]">
          <span className="stat-number mb-[10px] block text-[40px] font-extrabold text-[#1c095e]">
            Global
          </span>
          <h4 className="mb-[10px] text-[18px] font-bold text-[#050646]">
            Express Logistics
          </h4>
          <p className="text-[14px] leading-[1.5] text-[#5e5c5c]">
            Seamless premium shipping networks providing secure international
            distribution channels.
          </p>
        </div>
        {/* Card 3 */}
        <div className="value-stat-card rounded-[20px] border-2 border-[#5e5c5c] bg-[#e5e7ee] p-[30px] text-center transition-transform duration-300 ease-in-out hover:-translate-y-[5px]">
          <span className="stat-number mb-[10px] block text-[40px] font-extrabold text-[#1c095e]">
            24/7
          </span>
          <h4 className="mb-[10px] text-[18px] font-bold text-[#050646]">
            Dedicated Support
          </h4>
          <p className="text-[14px] leading-[1.5] text-[#5e5c5c]">
            Our dynamic customer care infrastructure is hamesha ready to assist
            with tailored solutions.
          </p>
        </div>
      </section>
    </div>
  );
}
