import IndexMdl from "../model/index.mdl.js"


class IndexController {
    register = async (ctx,next)=>{
        const {user_name,password} = ctx.request.body;
        ctx.body = ctx.request.body;
        console.log( ctx.body)
        let indexDdl = new IndexMdl()
        const req = await indexDdl.createUser(user_name,password)
        console.log(req)
    }
}

export default IndexController

