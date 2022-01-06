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
}

export default CartController;