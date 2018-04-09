import 'babel-polyfill'
import Router from 'koa-router'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import Notes from './controllers/notes'

const app = new Koa()
const router = new Router()
app.use(bodyParser())


router.get('/', (ctx, next) => {
	ctx.body = 'Hello world!'
})

router.use('/notes', Notes.routes())

app.use(router.routes())

app.listen(80)
