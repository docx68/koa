import jsonwebtoken from "jsonwebtoken";
import {jwt_secret} from '../config/app.config.js'

function jwt({...param}) {
    try {
        let token = jsonwebtoken.sign(param, jwt_secret, { expiresIn: '1d' });
        return token;
    } catch (e) {
        console.error(e)
    }
}

export default jwt;

