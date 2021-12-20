import Router from 'koa-router';
import IndexController from '../controller/index.ctl.js';


const indexRouter = new Router({prefix:'/'});

//const routerFun = new IndexController();

//console.log(routerFun.register);

//console.log(typeof indexController.register())
const indexController = new IndexController()


indexRouter.post('/',indexController.register)

export default indexRouter