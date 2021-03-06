import path  from "path";
import GoodsModel from '../model/goods.model.js'
import goodsError from "../error/goods.error.js";

class GoodsController {
    // 实例化模型
    goodsModel = new GoodsModel()

    // 文件上传处理
    uploads = async (ctx) => {
        let file = ctx.request.files.file;
        let fileType = ['image/jpeg','image/png'];
        let condition = fileType.includes(file.type);
        if (!condition) {
            ctx.app.emit('error',goodsError.unSupportedType,ctx);
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
            ctx.app.emit('error',goodsError.uploadsError,ctx);
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
            ctx.app.emit('error',goodsError.createError,ctx);
        }
        
    }

    // 修改商品
    update = async (ctx) => {
        try {
            let id = ctx.request.params.id
            let res = await this.goodsModel.update(id, ctx.request.body)
            if (res){
                ctx.response.body = {
                    code:0,
                    message:'商品修改成功',
                    result:""
                }
            } else {
                ctx.app.emit('error',goodsError.updateError,ctx);
                return;
            }

        } catch(e) {
            console.error(e)
        }
    }

    // 删除商品
    remove = async (ctx) => {
        try {
            let id = ctx.request.params.id;
            let res = await this.goodsModel.remove(id)
            if (res) {
                ctx.response.body = {
                    code:0 ,
                    message:'删除商品成功',
                    result:''
                }
            }else {
                ctx.app.emit('error',goodsError.removeError,ctx);
            }

        } catch(e){
            console.error(e);
        }
    }

    // 恢复删除商品
    restore = async (ctx) => {
        try {
            const id = ctx.request.params.id;
            let res = await this.goodsModel.restore(id)
            if (res) {
                ctx.response.body = {
                    code:0,
                    message:"恢复删除成功",
                    result:""
                }
            } else {
                ctx.app.emit('error',goodsError.restore,ctx);
            }
        } catch(e){

        }
    }

    // 查找全部商品
    findAll = async (ctx) => {
        // let page_num 分页第几页
        // let page_size 每页多少个
        const { page_num = 1,page_size = 10 } = ctx.request.query
        let res = await this.goodsModel.findAllGoods(page_num,page_size)

        if (res) {
            ctx.response.body = {
                code:0,
                message:"查询成功",
                result:res
            }
        } else {
            ctx.response.body = "没有数据"
        }
    }
}

export default GoodsController;