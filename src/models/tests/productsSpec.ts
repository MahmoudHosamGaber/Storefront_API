import { Product, ProductStore } from "../products";
import app from "../../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app);
const store = new ProductStore();

const product: Product = {
  name: "Test",
  price: "50",
};
describe("Product model", () => {
  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Should create a product", async () => {
    const result = await store.create(product);
    expect(result).toEqual({
      id: 1,
      name: "Test",
      price: 50,
    });
  });
  it("Should get all products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "Test",
        price: 50,
      },
    ]);
  });

  it("Should get a product", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: "Test",
      price: 50,
    });
  });
});

// ======================================== PRODUCT ENDPOINTS ========================================

describe("Product endpoints", () => {
  it("Should get all products", async () => {
    const result = await request.get("/api/products");
    expect(result.status).toBe(200);
    expect(result.body).toEqual([
      {
        id: 1,
        name: "Test",
        price: 50,
      },
    ]);
  });

  it("Should get a product", async () => {
    const result = await request.get("/api/products/1");
    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      id: 1,
      name: "Test",
      price: 50,
    });
  });
  it("Should create a product", async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    const result = await request
      .post("/api/products")
      .set({
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      })
      .send(product);
    expect(result.status).toBe(201);
    expect(result.body).toEqual({
      id: 2,
      name: "Test",
      price: 50,
    });
  });
});
