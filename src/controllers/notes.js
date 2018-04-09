import Router from 'koa-router'
import db from '../repository/notes'

const notesRouter = new Router()


notesRouter.get('/:uid', async (ctx, next) => {
	await db.getNotesForUser(ctx.params.uid, (results) => {
		ctx.body = results
	})
})

notesRouter.post('/:uid', async (ctx, next) => {
	return await db.createNewNote(
		{
			uid: ctx.params.uid,
			content: ctx.request.body.content,
			page: ctx.request.body.page
		},
		(statusCode) => {
			ctx.response.status = statusCode
		}
	)
})

notesRouter.delete('/:id', async (ctx, next) => {
	await db.deleteNote(ctx.params.id, (statusCode) => {
		ctx.response.status = statusCode
	})
})

export default notesRouter
