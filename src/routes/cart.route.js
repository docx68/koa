// 导入koa-router
import Router from "koa-router";

import AuthMiddleware from '../middleware/auth.middleware.js'
import AjvValidator from "../utils/ajv.js";
import CartController from "../controller/cart.controller.js";

// 实例化路由
const router = new Router({prefix:"/cart"})
// 实例化引入对象
const authMiddleware = new AuthMiddleware();
const ajvValidator = new AjvValidator()
const cartController = new CartController()

// 编写路由规则
// 添加购物车
router.post('/add',
    //authMiddleware.auth,
    ajvValidator.verify({
        properties: {
            goods_id: {type: "number"} 
        },
        required: ["goods_id"]
    }),
    cartController.add

)

// 查询购物车
router.get('/find_all',
    //authMiddleware.auth,
    cartController.findAll
)

// 更新购物车
router.patch('/update/:id',
    //authMiddleware.auth,
    ajvValidator.verify({
        properties: {
            number: { type: "number" } ,
            selected: { type: 'boolean' }
        }
    }),
    cartController.update
)

// 购物车全选和全不选功能
router.post('/selected_all',
   authMiddleware.auth,
   cartController.selectedAll 
)

// 购物车删除接口
router.post('/delete',
    //authMiddleware.auth,
    ajvValidator.verify({
        properties:{
            ids:{type:"array"}
        }
    }),
    cartController.remove
)
// 导出路由
export default router