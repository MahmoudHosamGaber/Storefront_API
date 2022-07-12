import { Product, ProductStore } from "../products";

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
