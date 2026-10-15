import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "smartpark_super_secret_jwt_key_2026");

      if (mongoose.connection.readyState === 1 && decoded?.id && String(decoded.id).match(/^[0-9a-fA-F]{24}$/)) {
        req.user = await User.findById(decoded.id).select("-password");
      }

      if (!req.user) {
        req.user = {
          _id: decoded.id || "demo-user-id",
          id: decoded.id || "demo-user-id",
          name: decoded.name || "SmartPark User",
          email: decoded.email || "user@example.com",
          role: decoded.role || "user",
        };
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    // Fallback demo user if token absent in dev preview
    req.user = {
      _id: "demo-user-id",
      id: "demo-user-id",
      name: "Suman Kumar",
      email: "user@example.com",
      role: "user",
    };
    return next();
  }
};
