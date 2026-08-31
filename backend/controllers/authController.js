import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendPasswordResetEmail } from "../utils/emailService.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email address" });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data structure input" });
    }
  } catch (error) {
    console.error("ACTUAL REGISTER ERROR:", error);
    res
      .status(500)
      .json({ message: "Server registration error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res
        .status(401)
        .json({ message: "Invalid email or password credentials" });
    }
  } catch (error) {
    console.error("ACTUAL LOGIN ERROR:", error);
    res
      .status(500)
      .json({ message: "Server login error", error: error.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const normalizedUsername = username?.trim();

    if (!normalizedUsername || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const admin = await User.findOne({
      username: normalizedUsername,
      role: "admin",
    });

    if (admin && (await admin.comparePassword(password))) {
      return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
        token: generateToken(admin._id),
      });
    }

    return res.status(401).json({
      message: "Invalid admin username or password.",
    });
  } catch (error) {
    console.error("ACTUAL ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server admin login error",
      error: error.message,
    });
  }
};

// Admin Forgot Password
export const forgotAdminPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Admin email is required.",
      });
    }

    const admin = await User.findOne({
      email: normalizedEmail,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        message: "No admin account found with this email.",
      });
    }

    const resetToken = generateToken(admin._id);

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const resetLink = `${frontendUrl}/admin/reset-password?token=${resetToken}`;

    await sendPasswordResetEmail(admin.email, resetLink);

    return res.status(200).json({
      message: "Password reset link has been sent to the admin email.",
    });
  } catch (error) {
    console.error("ACTUAL ADMIN FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Unable to send password reset email.",
    });
  }
};
export const resetAdminPassword = async (req, res) => {
try {
const { token, password } = req.body;
if (!token || !password) {
  return res.status(400).json({
    message: "Reset token and new password are required.",
  });
}
if (password.length < 6) {
  return res.status(400).json({
    message: "Password must be at least 6 characters long.",
  });
}

const decoded = jwt.verify(token, process.env.JWT_SECRET);
const admin = await User.findOne({
  _id: decoded.id,
  role: "admin",
});

if (!admin) {
  return res.status(404).json({
    message: "Admin account not found.",
  });
}
admin.password = password;
await admin.save();
return res.status(200).json({
  message: "Admin password has been reset successfully.",
});
} catch (error) {
console.error("ACTUAL ADMIN RESET PASSWORD ERROR:", error);
return res.status(400).json({
  message: "Invalid or expired password reset token.",
});


}
};

