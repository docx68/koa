import Koa from 'koa'
import koaBody from 'koa-body'

import indexRouter from '../router/index.js'

const app = new Koa()

app.use(koaBody());
app.use(indexRouter.routes())


export default app


