import Order from "./entity/order.js";

class OrderModel {
    async createOrder(data) {
        let row = await Order.create(data);
        if(row) {
            return row
        } else {
            return false
        }
    }
}

export default OrderModel;