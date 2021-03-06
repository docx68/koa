import CartModel from "../model/cart.model.js";
import cartError from "../error/cart.error.js";

class CartController {
    cartModel = new CartModel();
    add = async (ctx) => {
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id

        // 使用模型添加
        try {
            let res = await this.cartModel.addCart(user_id,goods_id);
            if (res == 0) {
                ctx.response.body = {
                    code:0,
                    message:'更新购物车成功',
                    result:""
                }
            }
            if (res == 1) {
                ctx.response.body = {
                    code:0,
                    message:'添加购物车成功',
                    result:""
                }
            }
        } catch(e) {
            console.error(e);
            ctx.app.emit('error',cartError.addCart,ctx)
            return
        }
    }

    findAll = async (ctx) => {
        // 进行分页查询
        const { page_num = 1,page_size = 10 } = ctx.request.query
        let res = await this.cartModel.findAllCart(page_num,page_size)

        if (res) {
            ctx.response.body = {
                code:0,
                message:"查询成功",
                result:res
            }
        } else {
            ctx.response.body = {
                code:401,
                message:"没有数据",
                result:""
            }
        }
    }

    // 更新购物车
    update = async (ctx) => {
        const { id } = ctx.request.params
        const { number , selected } = ctx.request.body

        if (number == undefined && selected == undefined) {
            cartError.updateCart.result = '无更新数据'
            ctx.app.emit(error,cartError.updateCart,ctx);
        }
        console.log(id)
        let res = await this.cartModel.updateCart({id,number,selected})
        if (res !== 0) {
            ctx.response.body = {
                code : 0,
                message: '更新购物车成功',
                result:res
            }
        } else {
            cartError.updateCart.result = '无更新'
            ctx.app.emit('error',cartError.updateCart,ctx)
        }
    }

    // 购物车全部选中和取消
    selectedAll = async (ctx) => {
        const user_id = ctx.state.user.id
        const {selected_all} = ctx.request.body
        let res = await this.cartModel.selectedAll(user_id,selected_all)
        if (res == 1 ){
            ctx.response.body = {
                code : 0,
                message:'全选了',
                result:''
            } 
        }else {
            ctx.response.body = {
                code : 0,
                message:'取消全选了',
                result:''
            }   
        }
        console.log(1)
    }

    // 删除购物车
    remove = async (ctx) => {
        const {ids} = ctx.request.body
        console.log(ctx.request.body)
        let res = await this.cartModel.removeCart(ids);

        if(res) {
            ctx.response.body = {
                    code: 0,
                    message: '删除购物车成功',
                    result: res
            }
        } else {
            ctx.response.body = {
                code: 0,
                message: '无数据',
                result: res
            }
        }

    }
}

export default CartController;