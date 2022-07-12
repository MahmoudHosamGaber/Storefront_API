import { Pool } from "pg";
const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
} = process.env;
const Client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "test" ? POSTGRES_TEST_DB : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default Client;
