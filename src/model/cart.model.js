import { Op } from "sequelize";
import Cart from "./entity/cart.js";
import Goods from './entity/goods.js'

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

    // 分页查询
    async findAllCart(page_num,page_size){
        // 统计条目
        let count =await Cart.count()
         // 刚印好的页面 转印下一页的位置
        const offset = ( page_num - 1 ) * page_size ; 
        // 每页多少
        let size = parseInt(page_size)

        let rows = await Cart.findAll({
            attributes:['id','number','selected'],
            offset:offset,
            limit:size,
            include:{
                model:Goods,
                as:'goods_info',
                attributes:['id', 'goods_name', 'goods_price', 'goods_img']
            }
        })

        console.log(rows);

        return {
            pageNum:page_num,
            pageSize:page_size,
            total: count,
            list: rows,
        }


    }

}

export default CartModel;