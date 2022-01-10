//import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg'
import { Pool } from 'pg'
import type { Location } from 'types'
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

const pool = new Pool(poolConfig)
pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
  })
  

export	const createLocation = async ( location: Location ) => 
	new Promise<void>((resolve, reject) => {
		const text= `INSERT INTO geo_location(name, point)VALUES('${location.name}', '(${location.longitude},${location.latitude})')`
		pool
		.connect()
		.then(client => {
			return client
			.query(text)
			.then(res => {
				client.release()
				resolve()
				console.log(res.rows[0])
			})
			.catch(err => {
				client.release()
				reject()
				console.log(err)
			})
		})
	})

