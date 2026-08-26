import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });
    const savedContact = await newContact.save();
    res.status(201).json({
      message: "Your message has been received successfully.",
      contact: savedContact,
    });
  } catch (error) {
    console.error("CONTACT MESSAGE ERROR:", error);
    res.status(400).json({
      message: "Failed to save contact message.",
      error: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("FETCH CONTACT MESSAGES ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch contact messages.",
      error: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({
        message: "Contact message not found.",
      });
    }
    res.status(200).json({
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE CONTACT MESSAGE ERROR:", error);
    res.status(500).json({
      message: "Failed to delete contact message.",
      error: error.message,
    });
  }
});
export default router;
