// Simple request validation helpers (no external deps)

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

const isStringArray = (v) =>
  v === undefined ||
  (Array.isArray(v) && v.every((item) => typeof item === "string"));

const validateCreateUser = (req, res, next) => {
  const { name, email, skills, interests, learningGoals } = req.body || {};

  const errors = [];

  console.log("before validate", { name, email, skills, interests, learningGoals });

  if (!isNonEmptyString(name)) errors.push("name is required");
  if (!isNonEmptyString(email)) errors.push("email is required");

  // Optional fields validation
  if (!isStringArray(skills)) errors.push("skills must be an array of strings");
  if (!isStringArray(interests)) errors.push("interests must be an array of strings");
  if (!isStringArray(learningGoals)) errors.push("learningGoals must be an array of strings");

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  return next();
};

const validateUpdateUser = (req, res, next) => {
  const { name, email, skills, interests, learningGoals } = req.body || {};

  const errors = [];

  // On update, all fields are optional, but if present must be valid
  if (name !== undefined && !isNonEmptyString(name)) errors.push("name must be a non-empty string");
  if (email !== undefined && !isNonEmptyString(email)) errors.push("email must be a non-empty string");

  if (!isStringArray(skills)) errors.push("skills must be an array of strings");
  if (!isStringArray(interests)) errors.push("interests must be an array of strings");
  if (!isStringArray(learningGoals)) errors.push("learningGoals must be an array of strings");

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  return next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
