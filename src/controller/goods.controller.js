import path  from "path";
import errorGoods from "../config/error.goods.js";

class GoodsController {
    // 文件上传处理
    uploads = async (ctx,next) => {
        let file = ctx.request.files.file;
        let fileType = ['image/jpeg','image/png'];
        let condition = fileType.includes(file.type);
        if (!condition) {
            ctx.app.emit('error',errorGoods.unSupportedType,ctx);
            return;
        }
        if (file) {
            ctx.body = {
                code:0,
                message:'文件上传成功',
                result:{
                    file_name:path.basename(file.path)
                }
            }
        } else {
            ctx.app.emit('error',errorGoods.uploadsError,ctx);
            return;
        }
    }

    // 上传商品
    add = async (ctx,next) => {
        ctx.body = {
            code:0,
            message:'商品添加成功',
            result:''
        }
    }

}

export default GoodsController;