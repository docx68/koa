import path  from 'path';
import Koa from 'koa'
import koaBody from 'koa-body'
import router from '../routes/index.js';
import error from './err.js';
import koasTatic from 'koa-static'

const app = new Koa()

app.use(koaBody({
    multipart:true,
    formidable:{
        uploadDir:path.join('.',"src/uploads/"),
        keepExtensions:true 
    }
}));

app.use(koasTatic(path.join('.',"src/uploads/")))

app.use(router.routes()).use(router.allowedMethods())
app.on('error', error);

export default app