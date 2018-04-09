// 'admin': 'Pass!word1'
import mysql from 'mysql2/promise'

var getDb = async () => {
	return await mysql.createConnection({
	  host     : 'notes.ccrnjb6da1jf.us-east-1.rds.amazonaws.com',
	  user     : 'admin',
	  password : 'Pass!word1',
	  database : 'pers_notes'
	});
}


const getNotesForUser = async (uid, callback) => {
	const db = await getDb()
	const [rows, fields] = await db.execute(`SELECT content, page FROM notes WHERE uid=${uid}`)
	callback(rows)
}

const createNewNote = async (note, callback) => {
	const db = await getDb()
	const sqlQuery = `INSERT INTO notes (uid, content, page) VALUES (${note.uid}, "${note.content}", ${note.page})`
	await db.execute(sqlQuery).then(() => {
		callback(201)
	})
	.catch((error) => {
		console.log(error)
		callback(400)
	})
}

const deleteNote = async (noteId, callback) => {
	const db = await getDb()
	const sqlQuery = `DELETE from notes where id=${noteId}`
	await db.execute(sqlQuery).then(() => {
		callback(200)
	})
	.catch((error) => {
		console.log(error)
		callback(400)
	})
}

export default {
	getNotesForUser,
	createNewNote,
	deleteNote
}
