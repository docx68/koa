import {UserHandle} from "../model/user.mdl.js";
import errorUser from "../config/error.user.js";

class UserController {
    signin = async (ctx,next)=>{
        const {user_name,password,is_amdmin} = ctx.request.body;
        try {
            let userHandle = new UserHandle();
            const res = await userHandle.createUser({user_name,password,is_amdmin})
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
}

export default UserController

