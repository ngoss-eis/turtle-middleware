import Router from 'koa-router'
import db from '../repository/users'

const userRouter = new Router()


notesRouter.get('/login', async (ctx, next) => {
	await db.authenticateAsUser(ctx.request.query.user, (results) => {
		ctx.body = results
	})
})

notesRouter.post('/create', async (ctx, next) => {
	return await db.createUser(
		{
			uname: ctx.request.body.uname,
			firstName: ctx.request.body.firstName,
			lastName: ctx.request.body.lastName
		},
		(statusCode) => {
			ctx.response.status = statusCode
		}
	)
})

notesRouter.put('/update', async (ctx, next) => {
	await db.updateUser(
		{
			id: ctx.request.body.id,
			uname: ctx.request.body.uname,
			firstName: ctx.request.body.firstName,
			lastName: ctx.request.body.lastName
		},
		(statusCode) => {
			ctx.response.status = statusCode
		}
	)
})

export default notesRouter
