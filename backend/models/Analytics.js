import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: ["click", "search", "view", "voice_search", "ai_search"],
    },

    target: {
      type: String,
      required: true,
    },

    meta: {
      type: String,
    },
  },
  { timestamps: true },
);
const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
