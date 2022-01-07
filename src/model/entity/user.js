import { DataTypes, Model }  from 'sequelize'
import { db_connect,db_prefix } from '../../common/db_connect.js'

class User extends Model{}

User.init(
    {
        // id sequelize 会自动创建该字段

        user_name: {
            type: DataTypes.STRING,
            allowNull: false ,
            unique: true,
            comment: '用户表'
            },
        password: {
            type: DataTypes.CHAR,
            allowNull:false,
            comment: '密码'
            },
        is_admin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:0 ,
            comment:"是否为管理，0不是，1是管理员"
        }
    },
    {
        sequelize:db_connect, 
        modelName: 'User' ,
        tableName: `${db_prefix}users`
    }
  )

// 强制同步创建数据表，开发时候用到，生产环境千万不能使用，否则会清除数据表中的数据
// await User.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");

export default User;