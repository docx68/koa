import { Op, where } from "sequelize";
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

    // 是否默认地址
    async setDefaultAddr(user_id,id) {
        await Addr.update(
            {is_default:false},
            {where:{
                user_id:user_id
            }}
        )
        let row = await Addr.update(
            {is_default:true},
            {where:{
                [Op.and]:[{user_id},{id}]
            }}
        )

        if (row.length !== 0 && row[0] !== 0) {
            return true
        } else {
            return false
        }
    }

    // 删除接口
    async removeAddr (id) {
        let row = await Addr.destroy({where:{id}})
        console.log(row)
        if ( row ) {
            return true
        } else {
            return false
        }
    }
}



export default AddrModel;