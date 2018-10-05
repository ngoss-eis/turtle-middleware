import Router from 'koa-router'
import db from '../repository/turtles'

const turtleRouter = new Router()



turtleRouter.post('/add', async (ctx, next) => {
	await db.addTurtleWithDetails(
		{
			datetime: ctx.request.body.datetime,
			type: ctx.request.body.type,
			size: ctx.request.body.size,
			location: ctx.request.body.location
		},
		(statusCode) => {
			ctx.response.status = statusCode
		}
	)
})

turtleRouter.get('/', async (ctx, next) => {
	await db.getAllTurtles((results, statusCode) => {
		ctx.body = results
		ctx.response.status = statusCode
	})
})

export default turtleRouter
