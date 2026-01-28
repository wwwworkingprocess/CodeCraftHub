# 03 — Create the User Service

## Original Prompt (Lab)
"I want to create a User Management Service for my learning platform. I will use Node.js and MongoDB. Please recommend an optimal project structure, including key folders, files, and configurations, following best practices for scalability, maintainability, and security."

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a senior Node.js/Express backend engineer. Be concise and practical. Recommend a scalable Express + Mongoose structure for a User Management microservice using MongoDB. Include security/maintainability essentials (env vars, validation, error handling). Output a directory tree with brief comments.

**User Prompt**
Recommend an optimal project structure for a User Management Service using Node.js (Express) and MongoDB (Mongoose).
Include key folders/files/configurations for scalability, maintainability, and security.
Return the structure as a directory tree with brief comments.

---

## Detailed Answer (Suggested Project Structure)

```text
user-management-service/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection (Mongoose)
│   ├── controllers/
│   │   └── userController.js      # CRUD handlers for users
│   ├── middleware/
│   │   ├── errorHandler.js        # Central error handling middleware
│   │   └── validate.js            # Request validation helpers (optional)
│   ├── models/
│   │   └── User.js                # Mongoose User schema/model
│   ├── routes/
│   │   └── userRoutes.js          # Routes for /api/users
│   ├── app.js                     # Express app setup (middleware + routes)
│   └── server.js                  # Server entry point (listen + connect DB)
├── tests/
│   └── users.test.js              # CRUD API tests (added later step)
├── package.json                   # Node.js dependencies and scripts
├── .env.example                   # Environment variable template
├── .gitignore
└── README.md
```

## Scaffold Commands (Create Folders and Files)

Run the following commands inside `user-management-service/`:

### Create folders
```bash
mkdir -p src/config \
         src/controllers \
         src/middleware \
         src/models \
         src/routes \
         tests
```

### Create files
```bash
touch src/config/db.js \
      src/controllers/userController.js \
      src/middleware/errorHandler.js \
      src/middleware/validate.js \
      src/models/User.js \
      src/routes/userRoutes.js \
      src/app.js \
      src/server.js \
      tests/users.test.js \
      .env.example \
      .gitignore
```

## Execution Plan (File Fill Order for Step 04)

In Step 04 ("Insert Code into Each File"), we will implement the service in the following order to minimize errors and keep dependencies clear:

1. **`package.json`**
    * Define dependencies (express, mongoose, dotenv, cors, etc.)
    * Define scripts (start/dev/test)
2. **`.gitignore` + `.env.example`**
    * Ensure secrets are not committed
    * Provide a template for required environment variables
3. **`src/config/db.js`**
    * Centralized MongoDB connection function (Mongoose)
4. **`src/models/User.js`**
    * Define User schema and validation rules (required fields, unique email)
5. **`src/controllers/userController.js`**
    * Implement CRUD handlers (create/get/list/update/delete)
6. **`src/routes/userRoutes.js`**
    * Map endpoints to controller functions ( `/api/users` )
7. **`src/middleware/errorHandler.js`**
    * Standardize error responses
8. **`src/middleware/validate.js` (optional)**
    * Basic request validation helper(s)
9. **`src/app.js`**
    * Configure middleware (JSON parsing, CORS), mount routes, health endpoint
10. **`src/server.js`**
    * Load env vars, connect DB, start server

> **Note:** Tests (`tests/users.test.js`) will be implemented in Step 05 ("Test the application").