import Client from "../config/database";
import bcrypt from "bcrypt";

export type User = {
  id?: number | string;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const users = await Client.query(`SELECT * FROM users`);
      conn.release();
      return users.rows;
    } catch (error) {
      throw new Error(`Error couldn't get all users: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const user = await Client.query(`SELECT * FROM users WHERE id = $1`, [
        parseInt(id),
      ]);
      conn.release();
      return user.rows[0];
    } catch (error) {
      throw new Error(`Error couldn't get user ${id}: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const insert = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`;
      const newUser = await Client.query(insert, [
        user.first_name,
        user.last_name,
        await bcrypt.hash(user.password + process.env.PEPPER, 10),
      ]);
      conn.release();
      return newUser.rows[0];
    } catch (error) {
      throw new Error(`Error couldn't create user: ${error}`);
    }
  }
}
