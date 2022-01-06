import Goods from "../orm/goods.js";

class GoodsModel {
    async createGoods ({...goods}){
        let res = await Goods.create(goods);
        return res.dataValues;
    }
}

export default GoodsModel;