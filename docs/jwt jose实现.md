```js
import * as jose from 'jose'
import errorUser from '../error/user.error.js'

    // 秘钥生成及打印出来
    // const { publicKey, privateKey } = await jose.generateKeyPair('ES256')
    // const exPublicKey = await jose.exportSPKI(publicKey)
    // const exPrivateKey = await jose.exportPKCS8(privateKey)
    // console.log(exPublicKey)
    // console.log(exPrivateKey)

    class JWT {
        // 公钥
        spki =`-----BEGIN PUBLIC KEY-----
        MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEc1UCuRcxpqGH8ZkU02E528cZI/QD
        WiH5IXjIMO/DvPFS1tliDArjKCzqCk5j6bvO/sjH0Cih7um7O8MqSbU00w==
        -----END PUBLIC KEY-----`

        // 私钥
        pkcs8 = `-----BEGIN PRIVATE KEY-----
        MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQguIJIBk0TwcS82057
        EqjLgGNdsHo/bTHhgtbo8Pn6dXShRANCAARzVQK5FzGmoYfxmRTTYTnbxxkj9ANa
        IfkheMgw78O88VLW2WIMCuMoLOoKTmPpu87+yMfQKKHu6bs7wypJtTTT
        -----END PRIVATE KEY-----`

        // 颁发令牌函数
        JWTSign = async (jwtpayload) => {
            // 输入私钥
            let ecPrivateKey = await jose.importPKCS8(this.pkcs8,  'ES256')


            // 生成jwt并返回
            try {
                const token = await new jose.SignJWT(jwtpayload)
                .setProtectedHeader({ alg: 'ES256' })
                .setExpirationTime('2d')
                .sign(ecPrivateKey)
                return token
            } catch(e) {
                console.error(e)
                return
            }
        }


        // 验证解构
        verify = async (ctx,next) => {
            // 输入公钥
            let ecPublicKey = await jose.importSPKI(this.spki, 'ES256')
            const { authorization } = ctx.request.header
            let token = authorization;
    
            try {
                // user 包含payload中的信息、包括用户名、是否管理员等
                const { payload } = await jose.jwtVerify(token, ecPublicKey)
                ctx.state.user = payload
            } catch (e) {
                // jwt 过期了
                if (e.code = 'ERR_JWT_EXPIRED') {
                    errorUser.tokenExpired.body.result = e.code
                    ctx.app.emit('error',errorUser.tokenExpired,ctx)
                    return
                } else {
                    errorUser.tokenError.body.result = e.code
                    ctx.app.emit('error',errorUser.tokenError,ctx)
                    return
                }
            }
    
            await next();
        }
    }


export default JWT;
```

