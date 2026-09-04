import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import path from "path";
import http from "http";
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import { initializeWebSocket } from "./config/websocket.js";

import productRoutes from "./routes/productRoutes.js";
import cmsRoutes from "./routes/cmsRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import { stripeWebhookHandler } from "./routes/stripeWebhookHandler.js";

connectDB();

const app = express();

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use(cors());

// STRIPE WEBHOOK

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler,
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nex-Style Voice Commerce API is officially running...");
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/stripe", stripeRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running actively on port ${PORT}`);
  console.log(`WebSocket server is ready on port ${PORT}`);
});
