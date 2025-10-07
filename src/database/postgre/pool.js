import { Pool } from "pg";
import config from "../../config/index.js";

const pool = new Pool({
    max: 10,
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export default pool;