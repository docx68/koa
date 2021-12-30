import Router from 'koa-router';
import UserController from '../controller/user.ctl.js';
import UserMiddleware from '../middleware/user.mdw.js';


const userRouter = new Router({prefix:'/user'});
const userMiddleware = new UserMiddleware();

//const routerFun = new IndexController();

//console.log(routerFun.register);

//console.log(typeof indexController.register())
const userController = new UserController()


userRouter.post('/signin',
            userMiddleware.userValidator,
            userMiddleware.userVerify,
            userMiddleware.cryptoPassword,
            userController.signin 
        )

userRouter.post('/login',
    userController.login 
)

export default userRouter