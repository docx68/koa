import Router from "koa-router";

import AuthMiddleware from "../middleware/auth.middleware.js";
import GoodsController from "../controller/goods.controller.js";

const router = Router({prefix:'/goods'});

const authMiddleware =new AuthMiddleware();
const goodsController = new GoodsController()

router.post('/uploads',
    authMiddleware.auth,
    authMiddleware.isAdmin,
    goodsController.uploads
)

export default router;