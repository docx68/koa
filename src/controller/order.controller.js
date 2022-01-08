import OrderModel from "../model/order.model.js";
import orderError from "../error/order.error.js";

class OrderController {
    orderModel = new OrderModel()
    create = async (ctx) => {
        // 解构用户id
        const user_id = ctx.state.user.id
        // 解构请求数据
        const {address_id, goods_info, total} = ctx.request.body;
        // 简单生成订单编号
        let order_number = Date.now()
        // 发送模型处理数据
        let res = await this.orderModel.createOrder({user_id,address_id,goods_info,total,order_number})

        if (res) {
            ctx.response.body = {
                code:0,
                message:"添加数据成功",
                result:res
            }
        } else {
            ctx.app.emit('error',orderError.create,ctx)
        }
    }

    // 获取订单
    find = async (ctx) => {
        // 解构出分页数据和状态
        const {page_num = 1 ,page_size = 10,status = 0 } = ctx.request.query
        let res = await this.orderModel.findOrder(page_num,page_size,status);
        if (res) {
            ctx.response.body = {
                code:0,
                message:"查询成功",
                result:res
            }
        } else{
            ctx.response.body = {
                code:200,
                message:"无数据",
                result:""
            }
        }
    }

    // 更新订单状态
    update = async (ctx) => {
        const id = ctx.request.params.id
        const {status} = ctx.request.body
        let res = await this.orderModel.updateOrder(id,status)
        if (res) {
            ctx.response.body = {
                code:0,
                message:"更新状态成功",
                result:""
            }
        } else {
            ctx.app.emit('error',orderError.update,ctx)
        }
    }
}

export default OrderController;