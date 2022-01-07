import Router from "koa-router";

import AuthMiddleware from "../middleware/auth.middleware.js";
import GoodsController from "../controller/goods.controller.js";
import AjvValidator from "../utils/ajv.js";

const router = new Router({prefix:'/goods'});

const authMiddleware =new AuthMiddleware();
const goodsController = new GoodsController()
const ajvValidator = new AjvValidator();

router.post('/uploads',
    authMiddleware.auth,
    authMiddleware.isAdmin,
    goodsController.uploads
)

router.post('/add',
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    //goodsValidator.validator,
    ajvValidator.verify({    
        properties: {
            goods_name: {type: "string"},
            goods_price: {type: "number"},
            goods_num: {type: "number"},
            goods_img: {type: "string"}
        },
        required: ["goods_name","goods_price","goods_num"]
    }),
    goodsController.create
)

// 修改商品路由
router.put('/update/:id',
    //authMiddleware.auth,
    //authMiddleware.isAdmin,
    ajvValidator.verify(
        {
            properties: {
                goods_name: {type: "string"},
                goods_price: {type: "number"},
                goods_num: {type: "number"},
                goods_img: {type: "string"}
            },
            required: ["goods_name","goods_price","goods_num"]
        }
    ),
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