import { Op } from "sequelize";
import Addr from './entity/addr.js'

class AddrModel {
    async createAddr (params){
        try {
            let row = Addr.create(params)
            if (row) {
                return row
            } else {
                return false
            }
        } catch(e){
            console.error(e)
            return false
        }
    }

    // 查询数据
    async findAllAddr(user_id) {
        try {
            let row = await Addr.findAll({
                attributes:['id', 'consignee', 'phone', 'address', 'is_default'] ,
                where:{
                    user_id:user_id
                }
            })
            if (row.length !== 0) {
                return row;
            } else {
                return false
            }
        } catch(e) {
            console.log(e)
        }
    }

    // 更新模型
    async updateAddr(id,data) {
        try{
            let row = await Addr.update(data,{where:{id}})
            console.log(row)
            if (row.length !== 0 && row[0] !== 0 ) {
                return row
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
        }
    }
}



export default AddrModel;