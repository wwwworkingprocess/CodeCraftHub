const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name must be at most 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email must be at most 254 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    skills: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    learningGoals: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);


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

module.exports = mongoose.model("User", UserSchema);
