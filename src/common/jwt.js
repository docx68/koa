import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../config/app.config.js'

class jwt {
    // 颁发令牌
    jwtSign = ({...param}) => {
        try {
            let token = jsonwebtoken.sign(param, jwt_secret, { expiresIn: '1d' });
            return token;
        } catch (e) {
            console.error(e)
        }
    }

    // 验证令牌
    jwtverify = (token) => {
        try {
            // user 包含payload中的信息、包括用户名、是否管理员等
            const user = jsonwebtoken.verify(token, jwt_secret)
            return user;
        } catch (e) {
            if (e.name == TokenExpiredError ){
                return '登录过期了'
            }
            if (e.name == JsonWebTokenError ) {
                return '无效登录'
            }
        }
    }
}



export default jwt;

