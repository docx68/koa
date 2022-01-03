import   UserModel  from "../model/user.model.js"
const { createHmac } = await import('crypto');
import errorLog from "../config/error.user.js"
import bcrypt from "bcryptjs";

class UserMiddleware {

    //初始化用户模型
    userModel = new UserModel()


    //验证用户和密码输入是否为空
    userValidator = async(ctx,next) => {
        const {user_name,password} = ctx.request.body
        if (!user_name || !password){
            ctx.app.emit('error', errorLog.userFormatErr, ctx)
            return 
        }
        await next()
    }

    //验证用户注册时候是不是已经存在
    userVerify = async(ctx,next) => {
        const {user_name} = ctx.request.body
        let userInfo = await this.userModel.getUser({user_name});
        if (userInfo) {
            ctx.app.emit('error',errorLog.userExist,ctx)
            return
        }

        await next()
    }

    //对用户密码进行加密

    cryptoPassword = async(ctx,next) => {
        const { password } = ctx.request.body;
        const secret = 'zhangdefang';
        //hash保存的是密文
        const hash = createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
        ctx.request.body.password = hash;
        
        await next()
    }
    //使用bcroptjs进行加密
    crpytpassword = async (ctx,next) => {
        const {password} = ctx.request.body;
        let salt = bcrypt.genSaltSync(10);
        //hash保存的是密文
        let hash = bcrypt.hashSync(password, salt);
        ctx.request.body.password = hash;
        await next();
    }

    // 核实登录
    verifyLogin = async (ctx,next) => {

        const { user_name,password } = ctx.request.body
        try {
            let userInfo = await this.userModel.getUser({user_name});
            // 1、判断用户名是否存在
            if (!userInfo) {
                ctx.app.emit('error',errorLog.userNotExist,ctx)
                return
            }

            // 2、判断密码是否正确
            let verifyPassword = bcrypt.compareSync(password, userInfo.password); 

            if (!verifyPassword){
                ctx.app.emit('error', errorLog.passwordError,ctx)
                return
            }
        } catch(e) {
            console.error(e);
            return
        }

        await next();
    }

}

export default UserMiddleware;