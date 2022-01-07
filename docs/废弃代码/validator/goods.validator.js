import Ajv from "ajv";
import errorGoods from "../error/goods.error.js";

const ajv = new Ajv();

class GoodsValidator {
    // 商品参数校验
    validator = async (ctx,next) => {
        const schema = {
            type: "object",
            properties: {
                goods_name: {type: "string"},
                goods_price: {type: "number"},
                goods_num: {type: "number"},
                goods_img: {type: "string"}
            },
            required: ["goods_name","goods_price","goods_num"],
            additionalProperties: false,
        }
        const validate = ajv.compile(schema)

        let data = ctx.request.body
        const valid = validate(data)
        if (!valid) {
            errorGoods.validateError.body.result = validate.errors[0].message
            ctx.app.emit('error',errorGoods.validateError,ctx)
            return
        }

        await next()
 
    }


}

export default GoodsValidator;