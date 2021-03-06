import Order from "./entity/order.js";

class OrderModel {

    // 生成订单
    async createOrder(data) {
        let row = await Order.create(data);
        if(row) {
            return row
        } else {
            return false
        }
    }

    // 查询订单
    async findOrder(page_num,page_size,status) {
        // 统计条目
        const count = await Order.count();
        // 刚印好的页面 转印下一页
        const offset = ( page_num - 1 ) * page_size ; //  通用公式 计算时候会自动转数字类型
        //传递过来的是字符 转为数字类型
        let size = parseInt(page_size);

        let rows = await Order.findAll({
            attributes:['goods_info', 'total', 'order_number', 'status'],
            where:{status:status},
            offset:offset,
            limit:size
        })
        // console.log(rows); 未查询到数据是个空数组
        if (rows.length !== 0 ) {
            return {
                page_num,
                page_size,
                total:count,
                list:rows    
            }
        } else {
            return false
        }
    }

    // 更新订单状态
    async updateOrder(id,status) {
        const row = await Order.update(
            {status:status},
            {where:{id}}
        )
        console.log(row)
        if (row) {
            return true
        } else {
            return false
        }
    }
}

export default OrderModel;