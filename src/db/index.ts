import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg'

const poolConfig = {
	database: process.env.DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	max: Number(process.env.DB_POOL_SIZE),
	idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
	connectionTimeoutMillis: Number(
		process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT
	),
}

class Database {
	pool: Pool

	constructor() {
		this.pool = new Pool(poolConfig)
	}

}

const db = new Database()

export default db