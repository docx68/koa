import UserModel from "../model/user.model.js";
import errorUser from "../error/user.error.js";
//import JWT from "../utils/jwt.js";
import joseJwt from "../utils/jose.js";

class UserController {
    
    // 初始化变量
    userModel = new UserModel();
    //jwt = new JWT();
    jwt = new joseJwt()
    

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
        const { id,user_name } = ctx.request.body;
        const { password, ...res } = await this.userModel.getUser({id,user_name})

        let token = await this.jwt.JWTSign(res)

        ctx.body = {
            code:200,
            message:`欢迎回来${user_name}`,
            result:{
                token:token
            }
        }
    }

    //修改用户信息
    change = async(ctx,next) => {
        let id = ctx.state.user.id;
        let password = ctx.request.body.password;

        let updateUserRes = await this.userModel.updateUser({id,password})
        
        if (updateUserRes) {
            ctx.body = {
                code:200,
                message:`修改成功`,
                result:{
                    'id':id
                }
            }
        } else {
            ctx.app.emit('error',errorUser.changeUserError,ctx);
        }

    }

}

export default UserController

