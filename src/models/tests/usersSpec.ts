import { User, UserStore } from "../users";
import supertest from "supertest";
import app from "../../server";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const request = supertest(app);
const first_name = "John";
const last_name = "Doe";
const password = "password";

describe("Test the users model", () => {
  const user = new UserStore();
  it("Should have a create method", (): void => {
    expect(user.create).toBeDefined();
  });
  it("Should have an index method", (): void => {
    expect(user.index).toBeDefined();
  });
  it("Should have a show method", (): void => {
    expect(user.show).toBeDefined();
  });

  it("Should create a user", async (): Promise<void> => {
    const newUser: User = {
      first_name,
      last_name,
      password,
    };
    const result = await user.create(newUser);
    expect({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
    }).toEqual({
      id: 1,
      first_name,
      last_name,
    });
    expect(
      await bcrypt.compare(password + process.env.PEPPER, result.password)
    ).toBeTrue();
  });

  it("Should get all users", async (): Promise<void> => {
    const result = await user.index();
    expect([
      {
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
      },
    ]).toEqual([
      {
        id: 1,
        first_name,
        last_name,
      },
    ]);
    expect(
      await bcrypt.compare(password + process.env.PEPPER, result[0].password)
    ).toBeTrue();
  });
  it("Should create a user", async (): Promise<void> => {
    const newUser: User = {
      first_name: "Jane",
      last_name,
      password,
    };
    const result = await user.create(newUser);
    expect({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
    }).toEqual({
      id: 2,
      first_name: "Jane",
      last_name,
    });
    expect(
      await bcrypt.compare(password + process.env.PEPPER, result.password)
    ).toBeTrue();
  });
  it("Should get a user", async (): Promise<void> => {
    const result = await user.show("2");
    expect({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
    }).toEqual({
      id: 2,
      first_name: "Jane",
      last_name,
    });
    expect(
      await bcrypt.compare(password + process.env.PEPPER, result.password)
    ).toBeTrue();
  });
});

// =========================================== USER ENDPOINTS ===========================================
describe("Test the user endpoints", () => {
  it("Should register a user", async (): Promise<void> => {
    const response = await request.post("/api/users/register").send({
      first_name,
      last_name,
      password,
    });
    expect(response.status).toBe(201);
  });
  it("Should login a user", async (): Promise<void> => {
    const response = await request.post("/api/users/login").send({
      id: 1,
      password,
    });
    expect(response.status).toBe(200);
  });
  it("Should get all users", async (): Promise<void> => {
    const response = await request.post("/api/users/login").send({
      id: 1,
      password,
    });
    const result = await request.get("/api/users").set({
      "Content-Type": "application/json",
      authorization: `Bearer ${response.body.token}`,
    });
    expect(result.status).toBe(200);
  });
  it("Should get a user", async (): Promise<void> => {
    const response = await request.post("/api/users/login").send({
      id: 1,
      password,
    });
    const result = await request.get("/api/users/1").set({
      "Content-Type": "application/json",
      authorization: `Bearer ${response.body.token}`,
    });
    expect(result.status).toBe(200);
  });
});
