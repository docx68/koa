import { DataTypes, Model }  from 'sequelize'
import { db_connect,db_prefix } from '../common/db.js'

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

class UserModel {
    // 创建用户
    async createUser ({user_name,password,is_amdmin}) {
        const result = await User.create({user_name,password,is_amdmin})
        return result.dataValues
    }

    //读取用户操作
    async getUser ({id,user_name,is_amdmin}){
        let whereOption = {}

        id && Object.assign(whereOption,{id})
        user_name && Object.assign(whereOption,{user_name})
        is_amdmin && Object.assign(whereOption,{is_amdmin})

        const res = await User.findOne({
            attributes:['id','user_name','password','is_admin'],
            where:whereOption
        })
        return res ? res.dataValues : null

    }

    // 修改密码
    async updateUser ({id,user_name,password,is_amdmin}) {
        // @var whereOption 是where的查询添加
        let whereOption = { id }
        let newUser = {};
        id && Object.assign(newUser,{id})
        user_name && Object.assign(newUser,{user_name})
        password && Object.assign(newUser,{password})
        is_amdmin && Object.assign(newUser,{is_amdmin})

        // 更新数据库
        let res = await User.update(newUser, {where: whereOption} )
        return res;

    }
}


export default UserModel;