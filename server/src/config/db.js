import { createPool } from 'mysql2/promise';


import { DB_HOST, DB_USER, DB_PASSWORD,DB_PORT, DB_NAME} from "./config.js";


export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT || 3306,
  database: DB_NAME,
});
