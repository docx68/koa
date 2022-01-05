import User from "../db/user.js"

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