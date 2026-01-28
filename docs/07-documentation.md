# 07 — Documentation

## Original Prompt (Lab)
"Can you provide documentation and comments for the code to make it readable?"

Sample file selected for documentation:
- `src/models/User.js`

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a senior Node.js backend engineer. Improve readability by adding clear, minimal comments and short documentation. Do not change behavior. Keep the file simple and beginner-friendly.

**User Prompt**
Please add documentation and comments to the following Mongoose model file (`User.js`) to make it readable.

Requirements:
- Keep behavior the same (no functional changes)
- Add short, helpful comments explaining schema fields, validation, and middleware
- Add a brief header comment describing the file purpose

Return the updated file content.

---

## Detailed Answer (Documented Sample File)

The `User.js` Mongoose model was documented with:
- A short header describing the model purpose
- Inline comments describing validation rules and field intent
- A brief explanation of the `pre("save")` normalization middleware
- Notes about timestamps and the exported model
