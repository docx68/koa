import Ajv from "ajv";
import cartError from "../error/cart.error.js";

const ajv = new Ajv();

class CartValidator {
    verify = (rules) => {
        return async (ctx,next) => {
            let data = ctx.request.body
            // 数据校验模式
            const schema = {
                type: "object",
                // 闭包调用
                properties:rules.properties,
                // properties: {
                //     goods_id: {type: "number"}
                // },
                required:rules.required,
                //required: ["goods_id"],
                additionalProperties: false,
            }
            const validate = ajv.compile(schema)
            const valid = validate(data)
            if (!valid) {
                cartError.validator.body.result = validate.errors[0].message
                ctx.app.emit('error', cartError.validator,ctx)
                return
            }
    
            await next();
        }
    }
}

export default CartValidator;