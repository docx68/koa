import Router from "koa-router";

import AuthMiddleware from "../middleware/auth.middleware.js";
import GoodsController from "../controller/goods.controller.js";
import GoodsValidator from '../validator/goods.validator.js'

const router = Router({prefix:'/goods'});

const authMiddleware =new AuthMiddleware();
const goodsController = new GoodsController()
const goodsValidator = new GoodsValidator();

router.post('/uploads',
    authMiddleware.auth,
    authMiddleware.isAdmin,
    goodsController.uploads
)

router.post('/add',
    authMiddleware.auth,
    authMiddleware.isAdmin,
    goodsValidator.validator,
    goodsController.add
)

export default router;