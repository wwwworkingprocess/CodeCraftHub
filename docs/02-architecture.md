# 02 — Choosing the architecture and components

## Original Prompt (Lab)
"I want to use a microservices architecture for the server side of a learning platform. The key services should include:

Personalized learning recommendations,
Interactive coding exercises
Real-time feedback to help developers improve their skills and knowledge.

Recommend the complete set of microservices and supporting server-side components I should include, along with their roles and how they should interact."

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a senior backend architect. Be concise and structured. Assume Node.js/Express microservices with MongoDB. Focus on services, responsibilities, and interactions.

**User Prompt**
Design a microservices backend for a learning platform with:
- Personalized learning recommendations
- Interactive coding exercises
- Real-time feedback

Provide:
1) A complete list of microservices (name + responsibility)
2) Supporting server-side components (API gateway, auth, messaging, caching, observability)
3) How services interact (a simple interaction flow for: sign-in → recommendation → exercise → real-time feedback → progress update)
4) Suggested data ownership (which service owns which MongoDB collections)

Keep it concise and well-structured.

---

## Detailed Answer (Architecture + Interactions)

### 1) Recommended Microservices (Core)
1. **User Management Service**
   - Accounts, profiles, preferences, skills/interests, roles
2. **Course/Catalog Service**
   - Courses, modules, tags, difficulty, prerequisites, searchable metadata
3. **Recommendation Service**
   - Personalized recommendations using user profile + activity + catalog metadata
4. **Exercise Service**
   - Exercise library (coding tasks, test cases, constraints, hints)
5. **Execution/Runner Service** (for interactive coding)
   - Secure code execution (sandbox), compile/run, returns results
6. **Feedback Service** (real-time feedback)
   - Evaluates submissions (tests, lint/static checks), generates feedback messages
7. **Progress/Tracking Service**
   - Progress, completions, attempts, scores, streaks, bookmarks

**Optional / Later (Nice-to-have)**
- **Search Service** (if catalog search becomes heavy)
- **Notification Service** (emails, reminders, in-app notifications)
- **Analytics/Reporting Service** (usage analytics, learning insights)
- **Content Service** (if you store rich content separately)

**Key takeaway:** For MVP, you can implement **User + Catalog + Progress + basic Exercise CRUD** first, then add runner/feedback/recommendations.

---

### 2) Supporting Server-Side Components
- **API Gateway / Reverse Proxy**
  - Single entry point, routes to services, rate limiting, request validation
- **Auth Component**
  - JWT-based auth (or session), token validation at gateway/service middleware
- **Message Broker (Async Events)**
  - Publish events like `exercise_submitted`, `progress_updated`, `user_updated`
  - Enables decoupling between services (recommended for feedback/recommendations)
- **Caching Layer (Optional)**
  - Cache catalog queries and recommendation results if needed
- **Observability**
  - Centralized logging, basic metrics, tracing (optional)
- **Config/Secrets Management**
  - Env vars, secret injection (never hardcode credentials)

---

### 3) Service Interaction (Example Flows)

#### A) Sign-in → Recommendation
1. Client calls **API Gateway**
2. Gateway routes to **User Management Service** for login
3. User service returns **JWT**
4. Client requests recommendations (JWT attached)
5. Gateway routes to **Recommendation Service**
6. Recommendation service reads:
   - User profile from **User Management Service** (sync REST) OR from cached user snapshot
   - Course metadata from **Catalog Service**
   - Progress signals from **Progress Service**
7. Recommendation service returns recommended items

#### B) Exercise → Real-time Feedback → Progress Update
1. Client selects exercise from **Exercise Service**
2. Client submits code to **Execution/Runner Service**
3. Runner executes in sandbox and returns output/status
4. Runner emits event `submission_executed` (or calls Feedback service)
5. **Feedback Service** evaluates:
   - Runs tests, static checks, generates feedback
6. Feedback is returned to client (real-time via WebSocket/SSE) OR polled via REST
7. **Progress Service** records attempt, score, completion
8. Progress emits `progress_updated` event
9. Recommendation service can use this event to update future recommendations

**Key takeaway:** Use synchronous REST for request/response, and async events for cross-service updates.

---

### 4) Data Ownership (MongoDB Collections by Service)
- **User Management Service**
  - `users` (profile, preferences, auth fields)
- **Catalog Service**
  - `courses`, `modules`, `tags` (course metadata)
- **Exercise Service**
  - `exercises` (prompt, starter code, constraints, test references)
- **Runner/Execution Service**
  - `runs` or `submissions` (execution metadata) *(optional; may be ephemeral)*
- **Feedback Service**
  - `feedback` (feedback messages, test results summaries) *(optional)*
- **Progress/Tracking Service**
  - `progress`, `attempts`, `completions`
- **Recommendation Service**
  - `recommendations` (optional cache), or compute on demand

**Key takeaway:** Each microservice should own its data; avoid sharing databases directly.

---

## Implementation Notes (What we will build in this capstone)
- This repository focuses on the **User Management Service** first (CRUD microservice).
- We will use:
  - **Node.js + Express.js** for the API
  - **MongoDB + Mongoose** for persistence
  - Clear API contracts and test coverage
- Other services are documented as part of the overall architecture, but not all are implemented in this repo.

