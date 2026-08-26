import express from "express";
import StoreConfig from "../models/storeConfig.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    let config = await StoreConfig.findOne();
    if (!config) {
      config = {
        websiteName: "Nex-Style",
        websiteSlogan: "Styles that defines you.",
        logoIcon: "icon",
        socialLinks: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com",
        },
        paymentLinks: {
          visa: "https://www.visa.com",
          mastercard: "https://www.mastercard.com",
          stripe: "https://stripe.com",
          paypal: "https://www.paypal.com",
        },
        heroSliders: [],
      };
    }
    res.status(200).json(config);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching CMS data.",
        error: error.message,
      });
  }
});
router.put("/", async (req, res) => {
  try {
    const {
      websiteName,
      websiteSlogan,
      logoIcon,
      heroSliders,
      socialLinks,
      paymentLinks,
    } = req.body;
    const updatedConfig = await StoreConfig.findOneAndUpdate(
      {},
      {
        websiteName,
        websiteSlogan,
        logoIcon,
        heroSliders,
        socialLinks,
        paymentLinks,
      },
      { returnDocument: "after", upsert: true },
    );
    res.status(200).json(updatedConfig);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while updating CMS data",
        error: error.message,
      });
  }
});

export default router;
