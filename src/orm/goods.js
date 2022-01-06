import { DataTypes, Model } from "sequelize";
import { db_connect,db_prefix} from '../common/db_connect.js'

class Goods extends Model{}

Goods.init(
    {
        // id sequelize 会自动创建该字段

        goods_name: {
            type: DataTypes.STRING,
            allowNull: false ,
            comment: '商品名称'
            },
        goods_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull:false,
            comment: '商品价格'
            },
        goods_num:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0 ,
            comment:"商品库存"
        },
        goods_img:{
            type:DataTypes.STRING,
            allowNull:false,
            comment:"商品展示图片"
        }
    },
    {
        sequelize:db_connect, 
        modelName: 'Goods' ,
        tableName: `${db_prefix}goods`,

        paranoid: true
    }
  )

// 创建数据库 如果有数据库则不创建
//await Goods.sync();

export default Goods;