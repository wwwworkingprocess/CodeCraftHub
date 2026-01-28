const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  // Default
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  // Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Duplicate key error (e.g., unique email)
  if (err && err.code === 11000) {
    statusCode = 409;
    const fields = Object.keys(err.keyValue || {});
    message = fields.length ? `Duplicate value for: ${fields.join(", ")}` : "Duplicate key error";
  }

  // Cast errors (invalid ObjectId sometimes appears here too)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Avoid leaking stack traces in responses
  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
