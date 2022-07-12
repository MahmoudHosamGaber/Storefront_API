import { Order, OrderStore } from "../orders";
import { Product } from "../products";
import { OrderProduct } from "../orderProducts";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import Client from "../../config/database";

const request = supertest(app);
const store = new OrderStore();
describe("OrderStore", (): void => {
  it("Should have getUserOrder method", () => {
    expect(store.getUserOrder).toBeDefined();
  });
  it("should get user order", async (): Promise<void> => {
    const result = await store.getUserOrder("1");
    expect(result).toEqual([] as OrderProduct[]);
  });
});

// ======================================== ORDER ENDPOINTS ========================================

describe("Order endpoints", () => {
  it("Should get all orders", async () => {
    const conn = await Client.connect();
    await conn.query(
      `INSERT INTO users (id, first_name, last_name, password) VALUES (999, 'test', 'test', 'test')`
    );
    const token = jwt.sign({ id: 999 }, process.env.JWT_SECRET as string);
    const result = await request
      .get("/api/orders")
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(200);
    expect(result.body).toEqual([]);
    await conn.query(`DELETE FROM users WHERE id = 999`);
    await conn.release();
  });
});
