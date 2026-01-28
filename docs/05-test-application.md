# 05 — Test the Application

## Original Prompt (Lab)
Use Generative AI to create test cases to test the endpoints of the User Management Service.

The tests should validate:
- Core CRUD functionality
- Correct API responses
- Data persistence in MongoDB

---

## Reworked Prompt (Optimized for AI)
I have implemented a User Management Service using Node.js, Express, and MongoDB.
Please generate automated test cases using Jest and Supertest to validate all CRUD API endpoints.

The tests should:
- Cover user creation, retrieval, update, and deletion
- Verify correct HTTP status codes and response structures
- Validate data persistence and uniqueness constraints (e.g., duplicate email)
- Be executable against the existing Express application

---

## Testing Approach

Generative AI was used to design a comprehensive automated testing strategy for the User Management Service.

The testing setup includes:
- **Jest** as the test runner
- **Supertest** for HTTP request simulation
- Direct testing of the Express app instance (without starting the server manually)
- MongoDB integration to validate real data persistence

Environment variables are loaded using `dotenv` to ensure the database connection is available during test execution.

---

## Implemented Test Coverage

The following API scenarios are covered:

- Create a new user (`POST /api/users`)
- Retrieve all users (`GET /api/users`)
- Retrieve a user by ID (`GET /api/users/:id`)
- Update an existing user (`PUT /api/users/:id`)
- Delete a user (`DELETE /api/users/:id`)
- Reject duplicate email creation (`409 Conflict`)

Each test validates:
- HTTP status codes
- Response structure (`success`, `data`, `message`)
- Correct behavior of validation and error handling logic

---

## Test Execution

Tests are executed using the following command:

```bash
npm test
```

All tests passed successfully, confirming:

- Endpoint correctness
- Validation logic effectiveness
- Proper MongoDB persistence and cleanup
- Stable service behavior under expected and edge-case conditions