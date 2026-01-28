const mongoose = require("mongoose");
const User = require("../models/User");

// Helper: validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * POST /api/users
 * Create a user
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, skills, interests, learningGoals } = req.body;

    const user = await User.create({
      name,
      email,
      skills,
      interests,
      learningGoals
    });

    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/users
 * List users (basic pagination)
 */
const getUsers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      data: items
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /api/users/:id
 * Get one user by id
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * PUT /api/users/:id
 * Update user by id
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const updates = {};
    const allowed = ["name", "email", "skills", "interests", "learningGoals"];
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * DELETE /api/users/:id
 * Delete user by id
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid user id" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted"
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
