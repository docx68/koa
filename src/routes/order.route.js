// 导入koa-router
import Router from "koa-router";

// 导入控制器
import OrderController from "../controller/order.controller.js";
import AjvValidator from "../utils/ajv.js";
import JWT from '../utils/jwt.js'

// 实例化引入对象
const orderController = new OrderController();
const ajv = new AjvValidator();
const jwt = new JWT();

// 实例化路由
const router = new Router({prefix:"/order"})

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

export default router