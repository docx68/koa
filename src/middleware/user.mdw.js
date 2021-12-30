import { UserHandle } from "../model/user.mdl.js"
const { createHmac } = await import('crypto');
import errorLog from "../config/error.user.js"

class UserMiddleware {
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
        let userHandle = new UserHandle()
        let userInfo = await userHandle.getUser({user_name});
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


}

export default UserMiddleware;