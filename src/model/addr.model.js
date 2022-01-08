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
}

export default AddrModel;