import 'babel-polyfill'
import Router from 'koa-router'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import Notes from './controllers/notes'
import Users from './controllers/users'

const app = new Koa()
const router = new Router()
app.use(bodyParser())
app.use(cors())


router.get('/', (ctx, next) => {
	ctx.body = 'Hello world!'
})

router.use('/notes', Notes.routes())
router.use('/users', Users.routes())

app.use(router.routes())

app.listen(3000)
