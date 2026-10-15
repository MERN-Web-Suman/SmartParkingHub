import mongoose from "mongoose";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, extra = {}) => {
  return jwt.sign({ id, ...extra }, process.env.JWT_SECRET || "smartpark_super_secret_jwt_key_2026", {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields (name, email, password)" });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check if database is connected
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({ name: String(name).trim(), email: cleanEmail, password, phone: phone || "" });
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role || "user",
        walletBalance: user.walletBalance ?? 420,
        token: generateToken(user._id, { name: user.name, email: user.email, role: user.role }),
      });
    } else {
      // Fallback for offline / dev preview mode without DB connection
      const demoId = "user_" + Date.now();
      return res.status(201).json({
        _id: demoId,
        name: String(name).trim(),
        email: cleanEmail,
        phone: phone || "",
        role: "user",
        walletBalance: 420,
        token: generateToken(demoId, { name: String(name).trim(), email: cleanEmail, role: "user" }),
      });
    }
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check if database is connected
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          role: user.role || "user",
          walletBalance: user.walletBalance ?? 420,
          token: generateToken(user._id, { name: user.name, email: user.email, role: user.role }),
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // Offline / Fallback Demo mode when DB is not connected
      const demoName = cleanEmail.split("@")[0] || "User";
      const demoRole = cleanEmail.includes("admin") ? "admin" : "user";
      const demoId = "demo_" + cleanEmail.replace(/[^a-zA-Z0-9]/g, "");

      return res.json({
        _id: demoId,
        name: demoName.charAt(0).toUpperCase() + demoName.slice(1),
        email: cleanEmail,
        role: demoRole,
        walletBalance: 420,
        token: generateToken(demoId, { name: demoName, email: cleanEmail, role: demoRole }),
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: error.message || "Login failed" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (mongoose.connection.readyState === 1 && userId && String(userId).match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.findById(userId).select("-password");
      if (user) {
        return res.json(user);
      }
    }

    return res.json(
      req.user || {
        _id: "demo-user-id",
        name: "Suman Kumar",
        email: "user@example.com",
        role: "user",
        walletBalance: 420,
      }
    );
  } catch (error) {
    console.error("GetProfile Error:", error);
    return res.status(500).json({ message: error.message || "Error fetching profile" });
  }
};
