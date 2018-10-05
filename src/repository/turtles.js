//turtlesa
//Ebsco!@#$
//db: turtleapp
const sql = require('mssql')

const config = {
	user: 'turtlesa',
	password: 'Ebsco!@#$',
	server: 'turtlehack1004.database.windows.net',
	database: 'turtleapp',
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		encrypt: true // Windows Azure eat your heart out
	}
}

const addTurtleWithDetails = async (data, callback) => {
	try {
		const pool = await sql.connect(config)
		const sqlQuery = 'INSERT INTO turtles (date_time, type, size, location)'
			+ `VALUES (\'${data.datetime}\', \'${data.type}\', \'${data.size}\', \'${data.location}\')`

		const result = await pool.request().query(sqlQuery)

		callback(200)
		pool.close()
	} catch (err) {
		console.log(err)
		callback(400)
	}
}


const getAllTurtles = async (callback) => {
	try {
		const pool = await sql.connect(config)
		const sqlQuery = 'SELECT * FROM turtles'

		const result = await pool.request().query(sqlQuery)

		pool.close()
		callback(result.recordset, 200)
	} catch (err) {
		console.log(err)
		callback(null, 400)
	}
	const sqlQuery = 'SELECT * FROM turtles'
}

export default {
	addTurtleWithDetails,
	getAllTurtles
}
