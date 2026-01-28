require("dotenv").config();  // needed for process.env.MONGO_URI

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

describe("User Management Service - /api/users", () => {
  let createdUserId;

  beforeAll(async () => {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be set for tests.");
    }
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("POST /api/users creates a user", async () => {
    const email = `test-${Date.now()}@example.com`;

    const res = await request(app)
      .post("/api/users")
      .send({
        name: "Test User",
        email,
        skills: ["js"],
        interests: ["backend"],
        learningGoals: ["testing"]
      })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.email).toBe(email);

    createdUserId = res.body.data._id;
  });

  test("GET /api/users returns a list", async () => {
    const res = await request(app).get("/api/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /api/users/:id returns a user", async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdUserId);
  });

  test("PUT /api/users/:id updates a user", async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send({ skills: ["js", "node", "mongodb"] })
      .set("Content-Type", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.skills).toEqual(expect.arrayContaining(["mongodb"]));
  });

  test("DELETE /api/users/:id deletes a user", async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/deleted/i);
  });

  test("POST /api/users rejects duplicate email", async () => {
    const email = `dup-${Date.now()}@example.com`;

    // create first
    await request(app)
      .post("/api/users")
      .send({ name: "Dup One", email })
      .set("Content-Type", "application/json");

    // create second with same email
    const res2 = await request(app)
      .post("/api/users")
      .send({ name: "Dup Two", email })
      .set("Content-Type", "application/json");

    expect(res2.statusCode).toBe(409);
    expect(res2.body.success).toBe(false);
  });
});
