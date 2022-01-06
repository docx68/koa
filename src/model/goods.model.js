import Goods from "../orm/goods.js";

class GoodsModel {
    async createGoods ({...goods}){
        let res = await Goods.create(goods);
        return res.dataValues;
    }

    async update (id,body) {
        let res = await Goods.update(body,{where:{id}})
        //console.log(res);
        return res[0]>0 ? 'true' : 'false'
    }
}

export default GoodsModel;