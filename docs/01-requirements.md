# 01 — Gathering requirements for the development of the learning platform

## Original Prompt (Lab)
"I want to create a personalized online learning platform, starting with the server side. Recommend an optimal design and architecture for the backend, and help me gather all the functional and non-functional requirements needed to build it."

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a senior backend architect. Provide concise, structured answers. Use microservices, Node.js/Express, and MongoDB. Focus on requirements and practical design.

**User Prompt**
Design a backend for a personalized online learning platform (server-side first).

Provide:
1) Recommended microservices architecture (high-level)
2) List of core backend services (name + responsibility)
3) Functional requirements for the User Management Service (CRUD + auth/profile)
4) Non-functional requirements (security, scalability, reliability, observability)
5) MongoDB data entities (collections) and key fields

Keep it concise and well-structured.

---

## Detailed Answer (Captured Output + Key Takeaways)

### 1) Recommended Backend Architecture (High-Level)
- **Microservices architecture** with separate services for user management, course catalog, recommendations, and tracking.
- **REST APIs** for service-to-client communication (and optionally service-to-service).
- **MongoDB** as the main persistence layer for user/profile and learning-related metadata.
- **API Gateway** (optional) for routing, auth enforcement, and rate limiting.

**Key takeaway:** Microservices improve modularity and allow independent scaling and deployment of services.

---

### 2) Core Backend Services (Microservices)
- **User Management Service**
  - User registration, authentication, profiles, preferences
- **Course Catalog Service**
  - Courses metadata, tags, difficulty, prerequisites
- **Recommendation Service**
  - Generates personalized learning recommendations based on user profile + activity
- **Progress/Tracking Service**
  - Tracks course progress, completion, bookmarks
- **Content/Search Service** (optional)
  - Search and filtering across courses/topics
- **Notification Service** (optional)
  - Email/in-app notifications, reminders

**Key takeaway:** Build MVP starting with **User Management** + **Catalog**; recommendations can be added after.

---

### 3) Functional Requirements — User Management Service
- **User CRUD**
  - Create user account
  - Read user profile
  - Update profile (bio, preferences, goals, skills, interests)
  - Delete user (or deactivate)
- **Authentication & Authorization**
  - Sign up / log in / log out
  - Password hashing and secure credential storage
  - Role-based access (e.g., user/admin) if required
- **Profile Management**
  - Learning goals (e.g., “learn backend”, “prepare for interview”)
  - Skill level, interests, preferred topics
  - Preferred learning style (optional)
- **Account Controls**
  - Reset password (optional for MVP)
  - Update email/password (optional)
- **Data Validation**
  - Enforce required fields and unique identifiers (e.g., email)

**Key takeaway:** The lab expects a **CRUD microservice** for user data; auth can be basic for MVP.

---

### 4) Non-Functional Requirements
- **Security**
  - Input validation, password hashing, avoid logging secrets
  - Rate limiting and basic protection against abuse
- **Scalability**
  - Stateless services, horizontal scaling support
- **Reliability**
  - Graceful error handling, consistent API responses
- **Performance**
  - Pagination for listing endpoints, indexes for common queries
- **Observability**
  - Structured logging, health endpoint, basic metrics (optional)
- **Maintainability**
  - Clear project structure, documentation, tests

**Key takeaway:** Even for MVP, include security + logging + predictable error handling.

---

### 5) MongoDB Data Entities (Collections) — Suggested
For the **User Management Service**, at minimum:

#### `users` collection
- `_id`
- `name`
- `email` (unique)
- `passwordHash` (if implementing auth)
- `role` (optional)
- `skills` (array)
- `interests` (array)
- `learningGoals` (array or string)
- `createdAt`, `updatedAt`

Optional later additions:
- `progress` (often better as separate service/collection)
- `recommendations` (often generated dynamically or stored elsewhere)

**Key takeaway:** Start with a single `users` collection for the user service.

---

## Implementation Notes (What we will build next)
- Create the **User Management Service** as a Node.js/Express microservice.
- Use **Mongoose** to model the `users` collection.
- Implement CRUD endpoints first; add auth if required by later steps.
