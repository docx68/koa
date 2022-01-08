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
}

export default AddrController;