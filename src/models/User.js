/**
 * User model (Mongoose schema)
 *
 * Purpose:
 * - Stores user profile information for the learning platform
 * - Supports basic personalization fields (skills, interests, learning goals)
 *
 * Notes:
 * - Validation is enforced at the schema level (required fields, format checks)
 * - `timestamps: true` automatically adds `createdAt` and `updatedAt`
 */

const mongoose = require("mongoose");

/**
 * UserSchema defines the shape of documents stored in the `users` collection.
 */
const UserSchema = new mongoose.Schema(
  {
    /**
     * Full name of the user.
     * - Required
     * - Trim removes leading/trailing whitespace
     * - Max length keeps values reasonable for display/storage
     */
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name must be at most 100 characters"]
    },

    /**
     * Unique email address (primary user identifier).
     * - Required
     * - Unique creates a unique index (enforced by MongoDB)
     * - Lowercase ensures normalized storage for case-insensitive comparisons
     * - Regex match provides a basic email format check
     */
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email must be at most 254 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },

    /**
     * Skills the user claims or is learning (e.g., ["js", "node", "mongodb"]).
     * Stored as an array of strings.
     */
    skills: {
      type: [String],
      default: []
    },

    /**
     * Interests the user has (e.g., ["backend", "devops"]).
     * Stored as an array of strings.
     */
    interests: {
      type: [String],
      default: []
    },

    /**
     * Learning goals (e.g., ["build APIs", "prepare for interviews"]).
     * Stored as an array of strings.
     */
    learningGoals: {
      type: [String],
      default: []
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

/**
 * Pre-save hook: normalize array fields
 *
 * Why:
 * - Ensures consistent storage by trimming strings
 * - Removes empty strings that could be introduced via UI/forms
 *
 * Important:
 * - This hook runs on `.save()` operations.
 * - It does NOT automatically run on `findByIdAndUpdate()` style updates,
 *   so updates should be validated/normalized at the controller layer if needed.
 */
UserSchema.pre("save", function () {
  const normalize = (arr) =>
    Array.isArray(arr)
      ? arr
          .map((s) => (typeof s === "string" ? s.trim() : ""))
          .filter((s) => s.length > 0)
      : [];

  this.skills = normalize(this.skills);
  this.interests = normalize(this.interests);
  this.learningGoals = normalize(this.learningGoals);
});

/**
 * Export the compiled model:
 * - MongoDB collection name will be pluralized by Mongoose (typically "users")
 */
module.exports = mongoose.model("User", UserSchema);
