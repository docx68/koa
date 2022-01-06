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
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    goodsValidator.validator,
    goodsController.create
)

// 修改商品路由
router.put('/update/:id',
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    goodsValidator.validator,
    goodsController.update
)

// 删除商品api
router.delete('/remove/:id',
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    goodsController.remove
)

// 恢复删除商品api
router.post('/retore/:id',
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    goodsController.restore
)

router.get('/find_all',
    goodsController.findAll
)

export default router;