import path  from "path";
import errorGoods from "../config/error.goods.js";

class GoodsController {
    // 文件上传处理
    uploads = async (ctx,next) => {
        let file = ctx.request.files.file;
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
}

export default GoodsController;