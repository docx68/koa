import Ajv from "ajv";
import ajvError from "../error/ajv.error.js";
// 引入
import localize from 'ajv-i18n'
// 实例化
const ajv = new Ajv({allErrors: true, messages: false});

class AjvValidator {
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
                // 使用汉语
                localize.zh(validate.errors)
                ajvError.validator.body.result = validate.errors
                ctx.app.emit('error', ajvError.validator,ctx)
                return
            }
    
            await next();
        }
    }
}

export default AjvValidator;