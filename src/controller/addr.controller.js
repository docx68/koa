import AddrModel from '../model/addr.model.js'
import addrError from '../error/addr.error.js';

class AddrController {
    // 模型实例化
    addrModel = new AddrModel();

    // 添加地址控制器
    create = async (ctx) => {
        const user_id = ctx.state.user.id
        const {consignee,phone,address} = ctx.request.body
        let res = await this.addrModel.createAddr({user_id,consignee,phone,address});
        if (res) {
            ctx.response.body = {
                code:0,
                message:'添加地址成功',
                result:res
            }
        } else {
            ctx.app.emit('error',addrError.addAddr,ctx)
        }
    }

    // 查询控制器
    findAll = async (ctx) => {
        const user_id = ctx.state.user.id
        let res = await this.addrModel.findAllAddr(user_id);
        if (res) {
            ctx.response.body = {
                code:0,
                message:'查询成功',
                result:res
            }
        } else {
            ctx.app.emit('error',addrError.find,ctx)
        }
    }

    // 更新地址
    update = async (ctx) => {
        const { id } = ctx.request.params
        let res = await this.addrModel.updateAddr(id,ctx.request.body)
        if (res) {
            ctx.response.body = {
                code:0,
                message:"更新成功",
                result:res
            }
        } else {
            ctx.app.emit('error',addrError.update,ctx)
        }
    }

    // 是否默认地址
    setDefault = async (ctx) => {
        const user_id = ctx.state.user.id
        const id = ctx.request.query.id
        let res = await this.addrModel.setDefaultAddr(user_id,id)
        if (res) {
            ctx.response.body = {
                code:0,
                message:"设置默认成功",
                result:""
            }
        } else {
            ctx.app.emit("error",addrError.is_default,ctx)
        }
    }

    // 删除地址
    delete = async (ctx) => {
        let id = ctx.request.params.id
        let res = await this.addrModel.removeAddr(id)
        console.log(res)
        if (res) {
            ctx.response.body = {
                code:0,
                message:"删除成功",
                result:""
            }
        } else {
            ctx.app.emit("error",addrError.delete,ctx)
        }
    }
}

export default AddrController;