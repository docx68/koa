import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../app/config.js'

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
    
}



export default jwt;

