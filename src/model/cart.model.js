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

        return {
            pageNum:page_num,
            pageSize:page_size,
            total: count,
            list: rows,
        }
    }

    // 更新购物车
    async updateCart(params) {
        // 解构变量
        const {id,number,selected} = params;

        // 查找数据
        let row = await Cart.findByPk(id)
        if (!row) {
            return 0
        } 
        // 赋值并修改
        number !== undefined ? row.number = number : ''
        selected !== undefined ? row.selected = selected : ''
        let res = await row.save();
        // 返回数据
        return res;
    }

    // 购物车全部选中和取消
    async selectedAll(user_id,selected_all) {
        if (selected_all) {
            await Cart.update(
                {selected:true },
                {
                    where:{
                        user_id:user_id
                    }
                }
            )
            return 1 // 全选
        } else {
            await Cart.update(
                {selected:false},
                {where:{
                    user_id:user_id
                    }
                }
            )
            return 0 // 全不选
        }

    }

    // 删除购物车
    async removeCart (ids) {
        const rows = Cart.destroy({
            where:{
                id:{
                    [Op.in]: ids
                }
            }
        })

        return rows 
    }

}

export default CartModel;