// 导入koa-router
import Router from "koa-router";

import AuthMiddleware from '../middleware/auth.middleware.js'
import CartValidator from "../validator/cart.validator.js";
import CartController from "../controller/cart.controller.js";

// 实例化路由
const router = new Router({prefix:"/cart"})
// 实例化引入对象
const authMiddleware = new AuthMiddleware();
const cartValidator = new CartValidator()
const cartController = new CartController()

// 编写路由规则
// 添加购物车
router.post('/add',
    authMiddleware.auth,
    cartValidator.verify,
    cartController.add

)

// 查询购物车
router.get('/find_all',
    //authMiddleware.auth,
    cartController.findAll
)

// 导出路由
export default router