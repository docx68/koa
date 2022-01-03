import UserModel from "../model/user.model.js";
import errorUser from "../config/error.user.js";
import jwt from "../common/jwt.js";
import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../config/app.config.js'



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
        const { id,user_name } = ctx.request.body;
        const { password, ...res } = await this.userModel.getUser({id,user_name})

        let token = jwt(res)
        console.log(token);

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


        ctx.body = {
            code:200,
            message:`修改用户成功`
        }

    }
}

export default UserController

