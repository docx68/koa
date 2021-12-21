import {UserHandle} from "../model/user.mdl.js";


class UserController {
    signin = async (ctx,next)=>{
        const {user_name,password,is_amdmin} = ctx.request.body;

        let userHandle = new UserHandle();
        try {
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
            console.log(err)
            
        }
        //let userMDL = new User()
        // try{
        //     const req = await User.create({user_name,password,is_amdmin})
        //     ctx.body = {
        //         code:0,
        //         message:'用户注册成功',
        //         result:{
        //             id:res.id,
        //             user_name:res.user_name
        //         }
        //     }
        // } catch(error) {
        //     console.log('添加用户是吧',error)
        // }
        

        
    }
}

export default UserController

