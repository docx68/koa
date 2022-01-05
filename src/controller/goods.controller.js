import path  from "path";
import GoodsModel from '../model/goods.model.js'
import errorGoods from "../error/error.goods.js";

class GoodsController {
    // 实例化模型
    goodsModel = new GoodsModel()

    // 文件上传处理
    uploads = async (ctx) => {
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

    // 添加商品
    create = async (ctx) => {
        try {
            let add = await this.goodsModel.createGoods(ctx.request.body);
            // 解构赋值出id和商品名称
            let {id,goods_name} = add

            if (add) {
                ctx.body = {
                    code:0,
                    message:'商品添加成功',
                    result: {id,goods_name}
                }
            }
        } catch(e){
            console.log(e)
            ctx.app.emit('error',errorGoods.createError,ctx);
        }
        
    }

}

export default GoodsController;