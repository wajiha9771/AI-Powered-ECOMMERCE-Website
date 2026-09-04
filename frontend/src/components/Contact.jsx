import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      alert("Thank you! Your message has been received by Nex-Style Support.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);
      alert(`Failed to send message: ${error.message}`);
    }
  };

  return (
    <section className="contact-section mx-auto max-w-[1200px] px-[15px] py-[30px] md:px-10 md:py-[60px] font-['Poppins',sans-serif]">
      <header className="contact-header mb-[50px] text-center">
        <h1 className="contact-main-title mb-1 text-[34px] font-bold text-[rgb(18, 18, 18)] md:text-[50px]">
          Contact Us
        </h1>
        <p className="contact-subtitle mx-auto max-w-[700px] text-[18px] text-[rgb(105,103,103)] md:text-[20px]">
          Have a question regarding your order or premium drops? Reach out to
          our dynamic support team.
        </p>
      </header>
      <div className="contact-grid grid grid-cols-1 gap-[25px] items-start md:grid-cols-[1fr_1.5fr] md:gap-[40px]">
        <div className="contact-info-column flex flex-col gap-[20px]">
          <div className="info-card flex items-center gap-[20px] rounded-[25px]  border border-[#c9c9ca] bg-[rgb(219, 215, 215)]  p-[25px] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
            <div className="info-icon flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full text-[28px] text[#121212]">
              🏠︎
            </div>
            <div className="info-details">
              <h4 className="mb-1 text-[18px] font-bold text-[rgb(18, 18, 18)] ">
                Our Headquarters
              </h4>
              <p className="m-0 text-[15px] font-medium text-[#1a1a1a]">
                Lahore, Pakistan.
              </p>
            </div>
          </div>
          <div className="info-card flex items-center gap-[20px] rounded-[25px] border border-[#c9c9ca] bg-[rgb(219, 215, 215)]  p-[25px] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
            <div className="info-icon flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full text-[28px] text[#121212]">
              ✆
            </div>
            <div className="info-details">
              <h4 className="mb-1 text-[18px] font-bold text-[rgb(18, 18, 18)] ">
                Call Support
              </h4>
              <p className="m-0 text-[15px] font-medium text-[#1a1a1a]">
                <a
                  href="tel:+923010456997"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  +92 3010456997
                </a>
              </p>
              <span className="mt-[2px] block text-[13px] text-[#5e5c5c]">
                Mon - Fri: 9AM - 6PM
              </span>
            </div>
          </div>
          <div className="info-card flex items-center gap-[20px] rounded-[25px]  border border-[#c9c9ca] bg-[rgb(219, 215, 215)]  p-[25px] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
            <div className="info-icon flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full text-[28px] text[#121212]">
              🖂
            </div>
            <div className="info-details">
              <h4 className="mb-1 text-[18px] font-boldtext-[rgb(18, 18, 18)] ">
                Digital Assistance
              </h4>
              <p className="m-0 text-[15px] font-medium text-[#1a1a1a]">
                <a
                  href="mailto:misswajiha1997@gmail.com"
                  className="m-0 text-[15px] font-medium text-[#1a1a1a] no-underline"
                >
                  misswajiha1997@gmail.com
                </a>
              </p>
              <span className="mt-[2px] block text-[13px] text-[#5e5c5c]">
                Response within 24 hours
              </span>
            </div>
          </div>
        </div>
        <div className="contact-form-card rounded-[25px] border border-[#c9c9ca] bg-[rgb(219, 215, 215)] p-[25px] md:p-[40px]">
          <h3 className="form-title mb-[25px] border-b-1 border-[text-[rgb(18, 18, 18)] ] pb-[10px] text-[24px] font-bold text-[text-[rgb(18, 18, 18)] ">
            Send Us A Message
          </h3>
          <form
            onSubmit={handleSubmit}
            className="custom-contact-form flex flex-col gap-[20px]"
          >
            <div className="form-group flex flex-col gap-[6px]">
              <label className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#050646]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="border-1 border-[rgba(94,92,92,0.4)] bg-white px-[16px] py-[12px] text-[15px] text-[#242222] outline-none rounded-[12px] font-['Poppins',sans-serif] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-[rgba(37,36,36,0.4)] focus:border-[#060757] focus:shadow-[0_0_8px_rgba(6,7,87,0.15)]"
              />
            </div>
            <div className="form-group flex flex-col gap-[6px]">
              <label className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#050646]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="border-1 border-[rgba(94,92,92,0.4)] bg-white px-[16px] py-[12px] text-[15px] text-[#242222] outline-none rounded-[12px] font-['Poppins',sans-serif] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-[rgba(37,36,36,0.4)] focus:border-[#060757] focus:shadow-[0_0_8px_rgba(6,7,87,0.15)]"
              />
            </div>
            <div className="form-group flex flex-col gap-[6px]">
              <label className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#050646]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                className="border-1 border-[rgba(94,92,92,0.4)] bg-white px-[16px] py-[12px] text-[15px] text-[#242222] outline-none rounded-[12px] font-['Poppins',sans-serif] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-[rgba(37,36,36,0.4)] focus:border-[#060757] focus:shadow-[0_0_8px_rgba(6,7,87,0.15)]"
              />
            </div>
            <div className="form-group flex flex-col gap-[6px]">
              <label className="text-[14px] font-semibold uppercase tracking-[0.5px] text-[#050646]">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your query here..."
                required
                className="border-1 border-[rgba(94,92,92,0.4)] bg-white px-[16px] py-[12px] text-[15px] text-[#242222] outline-none rounded-[12px] font-['Poppins',sans-serif] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-[rgba(37,36,36,0.4)] focus:border-[#060757] focus:shadow-[0_0_8px_rgba(6,7,87,0.15)]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="contact-submit-btn mt-[10px] cursor-pointer rounded-[12px] border-none bg-[#020202] p-[14px] text-[15px] font-semibold uppercase tracking-[0.5px] text-white transition-[background-color,transform] duration-200 ease-in-out active:scale-[0.98]"
              style={{ color: "#ffffff" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
