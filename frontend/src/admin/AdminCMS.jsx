import React, { useState, useEffect } from "react";
import { useCMS, useUpdateCMS } from "../hooks/useCMS";
import { useQueryClient } from "@tanstack/react-query";
import "./AdminLayout.css";

export default function AdminCMS() {
  const queryClient = useQueryClient();
  const { data: cmsData, isLoading, isError } = useCMS();
  const updateMutation = useUpdateCMS();
  const [websiteName, setWebsiteName] = useState("Nex-Style");
  const [websiteSlogan, setWebsiteSlogan] = useState(
    "Styles that defines you.",
  );
  const [logoIcon, setLogoIcon] = useState("icon");
  const [sliders, setSliders] = useState([]);

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  });

  const [paymentLinks, setPaymentLinks] = useState({
    visa: "https://www.visa.com",
    mastercard: "https://www.mastercard.com",
    stripe: "https://stripe.com",
    paypal: "https://www.paypal.com",
  });

  useEffect(() => {
    if (cmsData) {
      setWebsiteName(cmsData.websiteName || "Nex-Style");
      setWebsiteSlogan(cmsData.websiteSlogan || "Styles that defines you.");
      setLogoIcon(cmsData.logoIcon || "icon");
      setSliders(cmsData.heroSliders || []);

      setSocialLinks(
        cmsData.socialLinks || {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com",
        },
      );

      setPaymentLinks(
        cmsData.paymentLinks || {
          visa: "https://www.visa.com",
          mastercard: "https://www.mastercard.com",
          stripe: "https://stripe.com",
          paypal: "https://www.paypal.com",
        },
      );
    }
  }, [cmsData]);

  const handleAddSlider = () => {
    setSliders([
      ...sliders,
      {
        imageUrl: "",
        title: "",
        subtitle: "",
        buttonText: "Shop Now",
      },
    ]);
  };

  const handleSliderChange = (index, field, value) => {
    const updated = sliders.map((slider, i) => {
      if (i === index) {
        return { ...slider, [field]: value };
      }
      return slider;
    });

    setSliders(updated);
  };

  const handleRemoveSlider = (index) => {
    const filtered = sliders.filter((_, i) => i !== index);
    setSliders(filtered);
  };

  const handleFileSelection = (index, file) => {
    const localPreviewUrl = URL.createObjectURL(file);

    const updated = sliders.map((slider, i) => {
      if (i === index) {
        return {
          ...slider,
          imageUrl: localPreviewUrl,
          rawFile: file,
        };
      }
      return slider;
    });
    setSliders(updated);
  };
  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  const handlePaymentLinkChange = (platform, value) => {
    setPaymentLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      {
        websiteName,
        websiteSlogan,
        logoIcon,
        heroSliders: sliders,
        socialLinks,
        paymentLinks,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cms"] });
          queryClient.invalidateQueries({ queryKey: ["cmsData"] });
          queryClient.invalidateQueries({ queryKey: ["cmsSettings"] });

          alert("Store CMS Updated Successfully! ");
        },
        onError: (err) => alert(`Error: ${err.message}`),
      },
    );
  };

  if (isLoading)
    return (
      <div className="admin-loading-box p-5 font-bold">
        Loading Store Settings... ⏳
      </div>
    );

  if (isError)
    return (
      <div className="admin-error-box p-5 font-bold text-red-600">
        Error loading CMS settings ❌
      </div>
    );
  return (
    <div className="admin-cms-page">
      <h2 className="text-[24px] font-semibold text-[#212c41]">
        Online Store CMS & Hero Sliders
      </h2>

      <p className="admin-cms-subtitle mb-5 text-[20px] text-[rgb(105,103,103)]">
        Manage your website name, logo icon, slogan, social links, payment links
        and homepage slides deck seamlessly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="admin-form bg-[#ffffff] border border-[#5e5c5c] p-6 rounded-[8px] flex flex-col gap-5"
      >
        <div className="admin-config-grid">
          <div className="form-group">
            <label>Website Brand Name:</label>
            <input
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="admin-text-input"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Website Slogan / Subtitle:</label>
          <input
            type="text"
            value={websiteSlogan}
            onChange={(e) => setWebsiteSlogan(e.target.value)}
            className="admin-text-input"
          />
        </div>
        <hr className="admin-divider border-none border-t border-[#686363] my-[10px]" />

        <div className="admin-social-links-section">
          <h3 className="text-[20px] font-bold text-[#212c41] mb-2">
            Social Media Links 🌐
          </h3>
          <p className="text-[15px] text-[rgb(105,103,103)] mb-4">
            Set the social media URLs that will be used in the website footer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Facebook URL:</label>
              <input
                type="url"
                value={socialLinks.facebook}
                onChange={(e) =>
                  handleSocialLinkChange("facebook", e.target.value)
                }
                placeholder="https://facebook.com/yourpage"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>Instagram URL:</label>
              <input
                type="url"
                value={socialLinks.instagram}
                onChange={(e) =>
                  handleSocialLinkChange("instagram", e.target.value)
                }
                placeholder="https://instagram.com/yourpage"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>X / Twitter URL:</label>
              <input
                type="url"
                value={socialLinks.twitter}
                onChange={(e) =>
                  handleSocialLinkChange("twitter", e.target.value)
                }
                placeholder="https://x.com/yourpage"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL:</label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  handleSocialLinkChange("linkedin", e.target.value)
                }
                placeholder="https://linkedin.com/company/yourcompany"
                className="admin-text-input"
              />
            </div>
          </div>
        </div>
        <hr className="admin-divider border-none border-t border-[#686363] my-[10px]" />
        <div className="admin-payment-links-section">
          <h3 className="text-[20px] font-bold text-[#212c41] mb-2">
            Payment Method Links 💳
          </h3>
          <p className="text-[15px] text-[rgb(105,103,103)] mb-4">
            Set the URLs that will open when users click the payment icons in
            the footer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label>Visa URL:</label>
              <input
                type="url"
                value={paymentLinks.visa}
                onChange={(e) =>
                  handlePaymentLinkChange("visa", e.target.value)
                }
                placeholder="https://www.visa.com"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>Mastercard URL:</label>
              <input
                type="url"
                value={paymentLinks.mastercard}
                onChange={(e) =>
                  handlePaymentLinkChange("mastercard", e.target.value)
                }
                placeholder="https://www.mastercard.com"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>Stripe URL:</label>
              <input
                type="url"
                value={paymentLinks.stripe}
                onChange={(e) =>
                  handlePaymentLinkChange("stripe", e.target.value)
                }
                placeholder="https://stripe.com"
                className="admin-text-input"
              />
            </div>
            <div className="form-group">
              <label>PayPal URL:</label>
              <input
                type="url"
                value={paymentLinks.paypal}
                onChange={(e) =>
                  handlePaymentLinkChange("paypal", e.target.value)
                }
                placeholder="https://www.paypal.com"
                className="admin-text-input"
              />
            </div>
          </div>
        </div>
        <hr className="admin-divider border-none border-t border-[#686363] my-[10px]" />

        <div className="admin-sliders-header flex justify-between items-center">
          <h3>Hero Sliders Deck ({sliders.length})</h3>
          <button
            type="button"
            onClick={handleAddSlider}
            className="admin-add-slide-btn"
          >
            + Add New Slide
          </button>
        </div>
        {sliders.map((slide, index) => (
          <div key={index} className="admin-slide-card border p-4 rounded mb-4">
            <h4 className="admin-slide-title m-0 text-[18px] font-bold text-[rgb(28,9,94)]">
              Slide #{index + 1}
            </h4>
            <div className="admin-image-upload-box">
              <span className="admin-upload-section-title">
                Slide Image (Choose Option A or B):
              </span>

              {/* Option A */}
              <div>
                <span className="admin-upload-option-label">
                  Option A: Paste Image URL
                </span>
                <input
                  type="text"
                  value={slide.imageUrl || ""}
                  onChange={(e) =>
                    handleSliderChange(index, "imageUrl", e.target.value)
                  }
                  placeholder="Paste online image link here..."
                  className="admin-url-input-field"
                />
              </div>
              <div className="admin-upload-divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>

              {/* Option B */}
              <div>
                <span className="admin-upload-option-label">
                  Option B: Upload from Computer
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileSelection(index, file);
                    }
                  }}
                  className="admin-file-input-field"
                />
              </div>
              {slide.imageUrl && (
                <div className="admin-preview-wrapper">
                  <span className="admin-preview-label">Selected Preview:</span>
                  <img
                    src={slide.imageUrl}
                    alt="Preview"
                    className="admin-preview-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <div className="admin-dual-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="form-group">
                <label className="admin-xs-label">Title Line:</label>
                <input
                  type="text"
                  value={slide.title || ""}
                  onChange={(e) =>
                    handleSliderChange(index, "title", e.target.value)
                  }
                  placeholder="Main heading text..."
                  className="admin-text-input"
                />
              </div>
              <div className="form-group">
                <label className="admin-xs-label">Subtitle Line:</label>
                <input
                  type="text"
                  value={slide.subtitle || ""}
                  onChange={(e) =>
                    handleSliderChange(index, "subtitle", e.target.value)
                  }
                  placeholder="Small description text..."
                  className="admin-text-input"
                />
              </div>
              <div className="form-group mt-2">
                <label className="admin-xs-label">Button Text:</label>
                <input
                  type="text"
                  value={slide.buttonText || ""}
                  onChange={(e) =>
                    handleSliderChange(index, "buttonText", e.target.value)
                  }
                  placeholder="e.g., Shop Now, View Collection"
                  className="admin-text-input"
                />
              </div>
              <div className="form-group mt-2">
                <label className="admin-xs-label">
                  Button Link / Page Route:
                </label>
                <input
                  type="text"
                  value={slide.linkTo || ""}
                  onChange={(e) =>
                    handleSliderChange(index, "linkTo", e.target.value)
                  }
                  placeholder="e.g., /women, /men, /kids, /shop"
                  className="admin-text-input"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSlider(index)}
              className="admin-delete-slide-btn mt-3"
            >
              Delete Slide 🗑️
            </button>
          </div>
        ))}
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="admin-save-all-btn cursor-pointer"
        >
          {updateMutation.isPending
            ? "Saving Changes... ⏳"
            : "Save All Store Changes 💾"}
        </button>
      </form>
    </div>
  );
}
