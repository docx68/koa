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
}

export default OrderController;