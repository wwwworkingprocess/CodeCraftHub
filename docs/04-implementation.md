# 04 — Insert Code into Each File

## Original Prompt (Lab)
"I have set up the User Management Service project using Node.js and MongoDB based on the recommended folder structure. Please give me the code that is to be included in each of the files, ensuring it follows best practices for scalability, maintainability, and security. Include all necessary fields, models, controllers, routes, middleware, and configuration files."

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a senior Node.js/Express backend engineer. Generate clean, minimal, production-style code. Use Express + Mongoose + dotenv. Follow REST conventions. Use async/await, centralized error handling, and environment variables. Do not hardcode secrets. Keep code simple and readable.

**User Prompt**
I have a Node.js + MongoDB (Mongoose) User Management Service with this structure:

- src/config/db.js
- src/models/User.js
- src/controllers/userController.js
- src/routes/userRoutes.js
- src/middleware/errorHandler.js
- src/middleware/validate.js (optional)
- src/app.js
- src/server.js
- .env.example
- .gitignore
- package.json

Generate the complete code content for each file so the service can run and provide CRUD endpoints for `/api/users`.

Requirements:
- Use `MONGO_URI` and `PORT` from environment variables
- Provide endpoints: create user, list users, get user by id, update user, delete user
- Validate required fields and enforce unique email
- Return consistent JSON responses and HTTP status codes
- Include a `/health` endpoint
- Keep it minimal, secure, and maintainable

Output the answer grouped by filename, in the same order as the execution plan.

---

## Detailed Answer (Implementation Approach)

### Context to Apply (From Steps 01–03)
- **Step 01 (Requirements):** The service must support CRUD for user profiles and store key learning-platform fields (name, email, skills, interests, learning goals, timestamps).
- **Step 02 (Architecture):** This is a microservice with clear boundaries. It owns its data (MongoDB collections for users) and exposes a REST API.
- **Step 03 (Structure):** The code must fit the defined folder layout and follow maintainability/security basics (env vars, centralized error handling, validation).

### Implementation Plan (We will follow the Step 03 execution order)
We will implement code by filling files in this order (to reduce dependency issues):

1. `package.json`
2. `.gitignore` and `.env.example`
3. `src/config/db.js`
4. `src/models/User.js`
5. `src/controllers/userController.js`
6. `src/routes/userRoutes.js`
7. `src/middleware/errorHandler.js`
8. `src/middleware/validate.js` (optional)
9. `src/app.js`
10. `src/server.js`

### Output Expectations
- After these files are filled, the service should start successfully and expose:
  - `GET /health`
  - `POST /api/users`
  - `GET /api/users`
  - `GET /api/users/:id`
  - `PUT /api/users/:id`
  - `DELETE /api/users/:id`
- MongoDB connectivity is controlled via `MONGO_URI` in environment variables.
- Code will be minimal but aligned with best practices: validation, error handling, no hardcoded secrets.

