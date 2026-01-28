# 08 — Dockerfile

## Original Prompt (Lab)
"Can you provide the docker file to bundle the application and the MongoDB server in a container?"

---

## Reworked Prompt (Concise, Nano-friendly)

**Prompt Instructions (System / Role)**
You are a DevOps engineer. Provide a production-friendly container setup for a Node.js (Express) app with MongoDB. Prefer Dockerfile for the app and docker-compose to run MongoDB as a separate service. Keep it minimal and secure.

**User Prompt**
Create a Docker setup for a Node.js + MongoDB User Management Service.

Provide:
1) `Dockerfile` for the Node.js service (install deps, copy code, expose port, start)
2) `.dockerignore`
3) `docker-compose.yml` that runs:
   - `app` (build from Dockerfile)
   - `mongodb` (official mongo image)
4) Set `MONGO_URI` and `PORT` via environment variables in compose

Assume the app listens on `PORT` (default 5000) and exposes `/health`.

---

## Detailed Answer (What we implemented)
- A Dockerfile that containerizes the Node.js service.
- A docker-compose file that runs the Node.js service and MongoDB together.
- Environment variables are injected so the app connects to MongoDB via the internal Docker network.
