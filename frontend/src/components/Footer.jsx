import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useCMS } from "../hooks/useCMS";

const Footer = ({ openDrawerWithTab }) => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { data: cmsData } = useCMS();
  const fullWebsiteName = cmsData?.websiteName || "Nex-Style";
  const nameParts = fullWebsiteName.split("-");
  const firstPart = nameParts[0] || "Nex";
  const secondPart = nameParts[1] || "Style";
  const socialLinks = cmsData?.socialLinks || {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  };
  const paymentLinks = cmsData?.paymentLinks || {
    visa: "https://www.visa.com",
    mastercard: "https://www.mastercard.com",
    stripe: "https://stripe.com",
    paypal: "https://www.paypal.com",
  };
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h3 className="footer-logo">
            {firstPart}
            {nameParts.length > 1 && <span className="dash">-</span>}
            <span>{secondPart}</span>
          </h3>
          <p>
            Your one-stop destination for premium products. We deliver quality,
            speed, and exceptional customer service worldwide.
          </p>
          <div className="social-links">
            <a
              href={socialLinks.facebook || "https://facebook.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a
              href={socialLinks.twitter || "https://twitter.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={socialLinks.instagram || "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={socialLinks.linkedin || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-section footer-links">
          <h4>Our Company</h4>
          <ul>
            <li>
              <Link to="/about" onClick={scrollToTop}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={scrollToTop}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" onClick={scrollToTop}>
                Help & FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section footer-links">
          <h4>Assistance</h4>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openDrawerWithTab("track");
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                Track Your Order
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openDrawerWithTab("shipping");
                }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                Shipping & Delivery
              </a>
            </li>
            <li>
              <Link to="/returns" onClick={scrollToTop}>
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="/privacy" onClick={scrollToTop}>
                Privacy & Cookie Terms
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-section footer-contact">
          <h4>Contact Info</h4>
          <p>
            <span>🏠︎</span> Lahore, Pakistan
          </p>
          <p>
            <span>✆</span>{" "}
            <a
              href="tel:+923010456997"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              +92 301 0456997
            </a>
          </p>
          <p>
            <span>🖂</span>{" "}
            <a
              href="mailto:misswaji1997@gmail.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              misswajiha1997@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} Nex-Style. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
