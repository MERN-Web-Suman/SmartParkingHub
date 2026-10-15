export const admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "user")) {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }
};
