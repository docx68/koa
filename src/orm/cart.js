import { DataTypes, Model } from "sequelize";
import { db_connect,db_prefix} from '../common/db_connect.js'

class Cart extends Model{}

Cart.init(
    {
        goods_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:"商品id"
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:"用户id"
        },
        number:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:1,
            comment:'购物数量'
        },
        selected:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true,
            comment:'是否选中状态'
        }
    },
    {
        sequelize:db_connect, 
        modelName: 'Cart' ,
        tableName: `${db_prefix}cart`,
		
        // 启动软删除
        paranoid: true
    }

)

// Cart.sync();

export default Cart;
