import Cart from "../orm/cart.js";
import { Op } from "sequelize";

class CartModel {
    async addCart(user_id,goods_id){
        // 根据user_id goods_id同时查找 有则只需要更新购物车数量，无则增加
        let res = await Cart.findOne({
            where:{
                [Op.and]:{
                    user_id,
                    goods_id
                }
            }
        })

        if (res) {
            // 购物车已经存在了，执行增加数量操作
            res.increment('number',{by:1})
            let req = res.reload();
            return 0
        } else {
            // 购物车不存在 执行添加操作
            await Cart.create({
                user_id,
                goods_id
            })
            return 1
        }
    }

}

export default CartModel;