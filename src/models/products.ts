import Client from "../config/database";

export type Product = {
  id?: number | string;
  name: string;
  price: number | string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await Client.connect();
    const result = await conn.query("SELECT * FROM products");
    await conn.release();
    return result.rows;
  }

  async show(id: string): Promise<Product> {
    const conn = await Client.connect();
    const getProductById = "SELECT * FROM products WHERE id = $1";
    const result = await conn.query(getProductById, [parseInt(id)]);
    await conn.release();
    return result.rows[0];
  }

  async create(product: Product): Promise<Product> {
    const conn = await Client.connect();
    const insertProduct =
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
    const result = await conn.query(insertProduct, [
      product.name,
      parseInt(product.price as string),
    ]);
    await conn.release();
    return result.rows[0];
  }
}
