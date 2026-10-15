import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

// Connect MongoDB Database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io WebSockets
initSocket(server);

const PORT = process.env.PORT || 5000;

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Please stop the process using port ${PORT} or specify a different PORT in .env.`);
    process.exit(1);
  } else {
    console.error("Server error:", err);
  }
});

server.listen(PORT, () => {
  console.log(`SmartPark Backend Server running on port ${PORT}`);
});
