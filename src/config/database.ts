import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ..._
} = process.env;

const isTest = ENV === "test";
const Client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: isTest ? POSTGRES_TEST_DB : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default Client;
