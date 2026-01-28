const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const { validateCreateUser, validateUpdateUser } = require("../middleware/validate");

const router = express.Router();

router.post("/", validateCreateUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
