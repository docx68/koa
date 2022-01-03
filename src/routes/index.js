import * as fs from 'fs';
import Router from 'koa-router';

let router = new Router()

// 批量导入路由 注意不支持路由文件夹嵌套文件夹
fs.readdirSync('./src/routes/').forEach(file => {
    if (file !== 'index.js'){
        import('./'+file).then((route) => {
            router.use(route.default.routes())
        })
    }

})

export default router;