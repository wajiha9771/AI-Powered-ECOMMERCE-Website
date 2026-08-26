import express from "express";
import Analytics from "../models/Analytics.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const [
      totalSearches,
      totalClicks,
      totalAISearches,
      totalVoiceSearches,
      totalViews,
    ] = await Promise.all([
      Analytics.countDocuments({ eventType: "search" }),
      Analytics.countDocuments({ eventType: "click" }),
      Analytics.countDocuments({ eventType: "ai_search" }),
      Analytics.countDocuments({ eventType: "voice_search" }),
      Analytics.countDocuments({ eventType: "view" }),
    ]);

    res.status(200).json({
      totalSearches,
      totalClicks,
      totalAISearches,
      totalVoiceSearches,
      totalViews,
      eventBreakdown: {
        search: totalSearches,
        click: totalClicks,
        ai_search: totalAISearches,
        voice_search: totalVoiceSearches,
        view: totalViews,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analytics summary.",
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const logs = await Analytics.find().sort({ createdAt: -1 }).limit(50);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analytics logs.",
      error: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { eventType, target, meta } = req.body;
    const newLog = new Analytics({
      eventType,
      target,
      meta,
    });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({
      message: "Failed to record analytics event.",
      error: error.message,
    });
  }
});

export default router;
