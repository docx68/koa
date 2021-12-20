import Router from 'koa-router';
import UserController from '../controller/user.ctl.js';


const userRouter = new Router({prefix:'/'});

//const routerFun = new IndexController();

//console.log(routerFun.register);

//console.log(typeof indexController.register())
const userController = new UserController()


userRouter.post('/',userController.add)

export default userRouter