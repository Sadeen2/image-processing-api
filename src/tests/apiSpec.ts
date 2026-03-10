import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("API Endpoint Tests", () => {
  it("returns 200 for valid request", async () => {
    const response = await request.get(
      "/api/images?filename=rose&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it("returns 400 if filename missing", async () => {
    const response = await request.get("/api/images?width=200&height=200");
    expect(response.status).toBe(400);
  });

  it("returns 404 if image does not exist", async () => {
    const response = await request.get(
      "/api/images?filename=test&width=200&height=200"
    );
    expect(response.status).toBe(404);
  });
});