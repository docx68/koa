import Goods from "./entity/goods.js";

class GoodsModel extends Goods {
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

    // 查询全部商品
    async findAllGoods(page_num,page_size) {
        // 统计条目
        const count = await Goods.count();
        // 刚印好的页面 转印下一页
        const offset = ( page_num - 1 ) * page_size ; //  通用公式 计算时候会自动转数字类型
        //传递过来的是字符 转为数字类型
        let size = parseInt(page_size);

        const rows = await Goods.findAll({offset:offset,limit:size})
    
        if (!rows.length == 0 ) {
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
}

export default GoodsModel;