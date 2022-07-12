import Client from "../config/database";
import { Product } from "./products";

export type OrderProduct = {
  name: string;
  price: string | number;
  quantity: string | number;
};
export type Order = {
  id?: number | string;
  user_id: number | string;
  status: string;
};

export class OrderStore {
  async getUserOrder(user_id: number | string): Promise<Product[]> {
    const conn = await Client.connect();
    const getUserOrder = `SELECT p.name, p.price, sum(op.quantity) FROM
    orders as o INNER JOIN order_products as op
    ON o.id = op.order_id
    INNER JOIN products p
    ON op.order_id = p.id
    WHERE user_id = $1 AND o.status LIKE 'active'
    GROUP BY p.name, p.price`;
    const result = await conn.query(getUserOrder, [
      parseInt(user_id as string),
    ]);
    await conn.release();
    return result.rows;
  }
}
