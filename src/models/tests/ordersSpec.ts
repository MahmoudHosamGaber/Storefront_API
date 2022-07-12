import { Order, OrderStore } from "../orders";
import { Product } from "../products";
import { OrderProduct } from "../orderProductsController";
import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";

const request = supertest(app);
const store = new OrderStore();
describe("OrderStore", (): void => {
  it("Should have getUserOrder method", () => {
    expect(store.getUserOrder).toBeDefined();
  });
  it("should get user order", async (): Promise<void> => {
    const result = await store.getUserOrder(1);
    expect(result).toEqual([] as OrderProduct[]);
  });
});

// ======================================== ORDER ENDPOINTS ========================================

describe("Order endpoints", () => {
  it("Should get all orders", async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET as string);
    const result = await request
      .get("/api/orders")
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(200);
    expect(result.body).toEqual([]);
  });
});
