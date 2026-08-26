import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

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
