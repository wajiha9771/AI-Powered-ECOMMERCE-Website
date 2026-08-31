import express from "express";
import {
  registerUser,
  loginUser,
  loginAdmin,
  forgotAdminPassword,
  resetAdminPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", loginAdmin);
router.post("/admin/forgot-password", forgotAdminPassword);
router.post("/admin/reset-password", resetAdminPassword);

export default router;

