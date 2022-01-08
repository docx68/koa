import Router from "koa-router";

import AjvValidator from "../utils/ajv.js";
import JWT from '../utils/jwt.js'
import AddrController from "../controller/addr.controller.js";

const router = new Router({prefix:"/addr"})
const jwt = new JWT()
const ajv = new AjvValidator()
const addrController = new AddrController();


// 添加地址路由
router.post('/create',
    jwt.verify,
    ajv.verify({
        properties:{
            consignee:{type:"string", nullable: true},
            phone:{type:"string",pattern: "/^1\d{10}$/" },
            address:{type:"string"}
        },
        required: ["consignee","phone","address"]
    }),
    addrController.create
)

export default router