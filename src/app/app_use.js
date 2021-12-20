import Koa from 'koa'
import koaBody from 'koa-body'

import userRouter from '../router/user.js'

const app = new Koa()

app.use(koaBody());
app.use(userRouter.routes())


export default app


