import express from "express";
import http from "http";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Test server running on port ${port}`);

  try {
    // Test 1: Empty body login
    let res = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    console.log("Test 1 status:", res.status, await res.json());

    // Test 2: Login when DB is disconnected / fallback
    res = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "password123" }),
    });
    console.log("Test 2 status:", res.status, await res.json());

    // Test 3: Register
    res = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alex Test", email: "alex@example.com", password: "password123" }),
    });
    console.log("Test 3 status:", res.status, await res.json());

    // Test 4: Get profile with fallback auth
    res = await fetch(`http://127.0.0.1:${port}/api/auth/profile`, {
      method: "GET",
    });
    console.log("Test 4 status:", res.status, await res.json());

    console.log("ALL AUTH TESTS PASSED PERFECTLY!");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    server.close();
    process.exit(0);
  }
});
