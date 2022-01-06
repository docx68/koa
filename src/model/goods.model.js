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

    // 单个商品删除功能实现
    async remove (id) {
        let res = await Goods.destroy({where:{id}})
        return res ? true : false;
    }

    // 恢复商品
    async restore (id) {
        const res = await Goods.restore({where:{id}})
        return res ? true : false
    }
}

export default GoodsModel;