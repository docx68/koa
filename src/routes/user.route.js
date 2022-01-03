import Router from 'koa-router';
import UserController from '../controller/user.controller.js';
import UserMiddleware from '../middleware/user.middleware.js';
import AuthMiddleware from '../middleware/auth.middleware.js';


const router = new Router({prefix:'/user'});
const userMiddleware = new UserMiddleware();
const authMiddleware = new AuthMiddleware();

//const routerFun = new IndexController();

//console.log(routerFun.register);

//console.log(typeof indexController.register())
const userController = new UserController()


// 用户注册路由
router.post('/signin',
            userMiddleware.userValidator,
            userMiddleware.userVerify,
            userMiddleware.crpytpassword,
            userController.signin 
        )

router.post('/login',
    userMiddleware.userValidator,
    userMiddleware.verifyLogin,
    userController.login 
)

//修改用户信息
router.patch('/change',
    authMiddleware.change,
    userMiddleware.crpytpassword,
    userController.change
)


export default router