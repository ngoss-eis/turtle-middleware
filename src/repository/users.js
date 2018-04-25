// 'admin': 'Pass!word1'
import mysql from 'mysql2/promise'

var getDb = async () => {
	return await mysql.createConnection({
	  host     : 'pers-db.ccrnjb6da1jf.us-east-1.rds.amazonaws.com',
	  user     : 'admin',
	  password : 'Pass!word1',
	  database : 'pers_db'
	});
}

const authenticateAsUser = async (uname, callback) => {
	const db = await getDb()
	const sqlQuery = `SELECT uid FROM users WHERE uname=${uname}`
	const [rows, fields] = await db.execute(sqlQuery)
	callback(rows)
}

const createUser = async (userInfo, callback) => {
	const db = await getDb()
	const sqlQuery = 'INSERT INTO users (uname, first_name, last_name)'
                 + ` VALUES ("${userInfo.uname}", "${userInfo.firstName}", "${userInfo.lastName}")`
	await db.execute(sqlQuery).then(() => {
		callback(201)
		db.end()
	})
	.catch((error) => {
		console.log(error)
		callback(400)
		db.end()
	})
}

const updateUser = async (userInfo, callback) => {
	const db = await getDb()
	const sqlQuery = 'UPDATE users'
                + ` SET uname="${userInfo.uname}", first_name="${userInfo.firstName}", last_name="${userInfo.lastName}"`
                + ` WHERE id="${userInfo.id}"`
	await db.execute(sqlQuery).then(() => {
		callback(200)
		db.end()
	})
	.catch((error) => {
		console.log(error)
		callback(400)
		db.end()
	})
}



export default {
	authenticateAsUser,
	createUser,
	updateUser
}
