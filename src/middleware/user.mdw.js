import { UserHandle } from "../model/user.mdl.js"
import errorLog from "../config/error.user.js"

class UserMiddleware {
    userValidator = async(ctx,next) => {
        const {user_name,password} = ctx.request.body
    
        if (!user_name || !password){
            ctx.app.emit('error', errorLog.userFormatErr, ctx)
            return 
        }
        await next()
    }

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

}

export default UserMiddleware;