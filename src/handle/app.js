import Koa from 'koa'
import koaBody from 'koa-body'

import userRouter from '../routes/user.js'
import error from '../handle/err.js';

const app = new Koa()

app.use(koaBody());
app.use(userRouter.routes())
app.on('error', error);


export default app

