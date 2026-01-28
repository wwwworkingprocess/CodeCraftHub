const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "user-management-service",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/users", userRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
