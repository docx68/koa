// 导入koa-router
import Router from "koa-router";

// 导入控制器
import OrderController from "../controller/order.controller.js";
import AjvValidator from "../utils/ajv.js";
import JWT from '../utils/jwt.js'

import joseJwt from "../utils/jose.js";

// 实例化引入对象
const orderController = new OrderController();
const ajv = new AjvValidator();
//const jwt = new JWT();
const jwt = new joseJwt()

// 实例化路由
const router = new Router({prefix:"/order"})

// 提交订单
router.post("/create",
    jwt.verify,
    ajv.verify({
        properties: {
            address_id: {type: "integer"},
            goods_info: {type: "string"},
            total: {type: "number"}
        }
    }),
    orderController.create
)

// 获取订单
router.get("/find",
    //jwt.verify,
    orderController.find
)

// 更新订单
router.patch("/update/:id",
    //jwt.verify,
    ajv.verify({
        properties: {
            status: {type: "number"}
        }
    }),
    orderController.update
)

export default router