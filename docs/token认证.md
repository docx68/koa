jwt验证用户是否登录状态

使用：jsonwebtoken.verify(token, jwt_secret)

```js
import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../app/config.js'
import errorUser from '../error/user.error.js'

// 验证用户登录状态
    auth = async (ctx,next) => {
        const { authorization } = ctx.request.header
        let token = authorization;

        try {
            // user 包含payload中的信息、包括用户名、是否管理员等
            const user = jsonwebtoken.verify(token, jwt_secret)
            ctx.state.user = user
        } catch (e) {

            if (e.name == 'TokenExpiredError' ){
                ctx.app.emit('error',errorUser.tokenExpired,ctx)
                return
            }

            if (e.name == 'JsonWebTokenError' ) {
                ctx.app.emit('error',errorUser.tokenError,ctx)
                return
            }

            ctx.app.emit('error',errorUser.tokenError,ctx)
            return
        }

        await next();
    }

```

