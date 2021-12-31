import UserModel from "../model/user.model.js";
import errorUser from "../config/error.user.js";

class UserController {
    
    // 初始化变量
    userModel = new UserModel();

    //注册接口
    signin = async (ctx,next)=>{
        const {user_name,password,is_amdmin} = ctx.request.body;
        try {
            const res = await this.userModel.createUser({user_name,password,is_amdmin})
            ctx.body = {
                code:0,
                message:'用户注册成功',
                result:{
                    id:res.id,
                    user_name:res.user_name
                }
            }
        } catch (err) {
            console.error('服务器内部错误',err);
            ctx.app.emit('error',errorUser.userDB,ctx)
            return
        }
    }

    //登录接口      
    login = async (ctx,next) => {
        const {user_name,password} = ctx.request.body
        ctx.body = `欢迎回来${user_name}`
    }
}

export default UserController

